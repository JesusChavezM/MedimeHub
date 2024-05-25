import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connect from "../../../../lib/mongodb";
import bcrypt from "bcryptjs";
import User from "../../../../models/user";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        await connect();
        try {
          const user = await User.findOne({ email: credentials.email });
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
            if (isPasswordCorrect) {
              return user;
            }
          }
          return null;
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      await connect();
      try {
        if (account.provider === "credentials") {
          return true;
        }
        if (account.provider === "google") {
          const existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            const newUser = new User({
              email: user.email,
              name: user.name,
              role: 'user' // Puedes ajustar este valor según sea necesario
            });
            await newUser.save();
            return true;
          }
          return true;
        }
      } catch (err) {
        console.log("Error saving user", err);
        return false;
      }
    },
    async session({ session, token }) {
      await connect();
      const user = await User.findOne({ email: session.user.email });
      if (user) {
        session.user.role = user.role;
      }
      return session;
    }
  }
});

export { handler as GET, handler as POST };

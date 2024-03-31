"use client";

import Link from "next/link";
import Image from "next/image";
import { signIn, useSession, signOut } from "next-auth/react";
import { ST } from "next/dist/shared/lib/utils";
import singout from "../assets/singout.svg";


function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="w-80 h-14 flex px-6 sm:justify-between justify-center">
      <Link href="/"/>
      {session?.user ? (
        <div className="rounded-xl bg-300 border border-900 justify-center items-center gap-2.5 inline-flex">
          <Link href="/dashboard"></Link>
          <img
            src={session.user.image}
            className="flex w-10 h-10 rounded-full bg-purple-100"
          />
          <p className="text-purple-900 text-xl font-extrabold text-center w-full">
            {session.user.name}
          </p>
          <button className="w-16 items-center justify-center cursor-pointer"
            onClick={async () => {
              await signOut({
                callbackUrl: "/",
              })
            }}
          >
            <Image
              src={singout}
              alt="Sing out"
              width={30}
              height={30}
            />
          </button>     
        </div>
      ) : (
        <button
          onClick={() => signIn()}
          className="text-purple-900 text-2xl font-bold cursor-pointer"	
        >
          Login
        </button>
        
      )}
    </nav>
  );
}
export default Navbar;
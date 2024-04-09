"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Register = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/dashboard");
    }
  }, [sessionStatus, router]);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    const name = e.target[2].value;

    if (!isValidEmail(email)) {
      setError("Email is invalid");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password is invalid");
      return;
    }

    if (!name) {
      setError("Name is invalid");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          name,
        }),
      });
      if (res.status === 400) {
        setError("This email is already registered");
      }
      if (res.status === 200) {
        setError("");
        router.push("/dashboard");
      }
    } catch (error) {
      setError("Error, try again");
      console.log(error);
    }
  };

  if (sessionStatus === "loading") {
    return <div className="flex min-h-screen flex-col items-center justify-between p-24 text-900 font-bold"><h1>Loading...</h1></div>;
  }

  return (
    sessionStatus !== "authenticated" && (
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="bg-100 p-8 rounded shadow-md w-96 border border-600">
          <h1 className="text-600 text-4xl text-center font-bold mb-8">Register</h1>
          <form onSubmit={handleSubmit}>            
            <input
              type="text"
              className="w-full border border-600 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-900 focus:text-black"
              placeholder="Correo"
              required
            />
            <input
              type="password"
              className="w-full border border-600 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-900 focus:text-black"
              placeholder="Contraseña"
              required
            />
            <input
              type="text"
              className="w-full border border-600 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-900 focus:text-black"
              placeholder="Nombre"
              required
            />
            <button
              type="submit"
              className="w-full bg-600 text-50 py-2 rounded-2xl hover:bg-700 cursor-pointer"
            >
              {" "}
              Registrarse
            </button>
            <p className="text-red-600 text-[16px] mb-4">{error && error}</p>
          </form>
          <div className="text-center text-lg text-600 py-2">- OR -</div>
          <Link
            className="block text-center hover:underline mt-2 cursor-pointer text-600 text-lg"
            href="/login"
          >
            Login with an existing account
          </Link>
        </div>
      </div>
    )
  );
};

export default Register;

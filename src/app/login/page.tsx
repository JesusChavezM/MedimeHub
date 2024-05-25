"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  // const session = useSession();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/inicio");
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

    if (!isValidEmail(email)) {
      setError("Email is invalid");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password is invalid");
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
      if (res?.url) router.replace("/inicio");
    } else {
      setError("");
    }
  };

  if (sessionStatus === "loading") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-between p-24 text-900 font-bold">
        <h1>Cargando ...</h1>
      </div>
    );
  }

  return (
    sessionStatus !== "authenticated" && (
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="bg-100 p-8 rounded shadow-md w-96 border border-600">
          <h1 className="text-600 text-4xl text-center font-bold mb-8">
            Iniciar Sesión
          </h1>
          <form onSubmit={handleSubmit}>
          <span className="text-800 text-md text-center font-bold mb-8">Correo:</span>
            <input
              type="text"
              className="w-full border border-600 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-900 focus:text-black"
              placeholder="Correo"
              required
            />
            <span className="text-800 text-md text-center font-bold mb-8">Contraseña:</span>
            <input
              type="password"
              className="w-full border border-600 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-900 focus:text-black"
              placeholder="Contraseña"
              required
            />
            <button
              type="submit"
              className="w-full bg-600 text-50 py-2 rounded-2xl hover:bg-700 cursor-pointer"
            >
              {" "}
              Iniciar sesión
            </button>
            <p className="text-red-600 text-[16px] mb-4">{error && error}</p>
          </form>
          <div className="flex items-center justify-center">
            <div className="w-full text-center text-lg text-600 py-2">
              <div className="border border-600"></div>
            </div>
            <div className="mx-4 text-600 font-bold text-2xl">o</div>
            <div className="w-full text-center text-lg text-600 py-2">
              <div className="border border-600"></div>
            </div>
          </div>

          <button
            className="w-full justify-center border border-600 bg-white text-black py-2 rounded-2xl hover:bg-200 flex items-center space-x-6"
            onClick={() => {
              signIn("google");
            }}
          >
            <img
              src="https://img.icons8.com/color/48/000000/google-logo.png"
              alt="Google Icon"
              className="w-10 h-10"
            ></img>
            <div>Continuar con Google</div>
          </button>

          <Link
            className="block text-center hover:underline mt-2 cursor-pointer"
            href="/register"
          >
            <span className="text-600 text-lg">¿Eres nuevo?</span>
            <span className="text-900 text-lg"> Crea una cuenta</span>
          </Link>
        </div>
      </div>
    )
  );
};

export default Login;

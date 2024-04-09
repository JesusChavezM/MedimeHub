"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../assets/logo-landing.svg";
import singout from "../assets/singout.svg";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session }: any = useSession();
  return (
    <div className="sticky top-1 z-50 bg-50 rounded-xl shadow-xl">
      <div className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-8 my-2 md:my-0">
        <div className="flex items-center gap-1">
          <div
            className="h-8 w-8 sm:h-16 sm:w-16"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image src={logo} width={70} height={70} alt="Logo" />
          </div>
          <div className="text-xl sm:text-4xl font-bold text-violet-600">
            <Link href="/">MedimeHub</Link>
          </div>
        </div>
        <div className="flex gap-2 sm:flex-row mx-2 sm:mx-20">
          <div className="text-center text-violet-900 text-xl sm:text-2xl font-bold my-2 sm:my-0 sm:mx-10">
            Home
          </div>
          <div className="text-center text-violet-900 text-xl sm:text-2xl font-bold my-2 sm:my-0 sm:mx-10">
            About
          </div>
          <div className="text-center text-violet-900 text-xl sm:text-2xl font-bold my-2 sm:my-0 sm:mx-10">
            FAQ
          </div>
        </div>
        <div className="flex sm:flex-row flex-col-reverse sm:items-center">
          {!session ? (
            <>
              <Link href="/login">
                <span className="text-purple-900 mx-5 text-2xl font-bold cursor-pointer hover:text-600">
                  Iniciar sesión
                </span>
              </Link>
              <Link href="/register">
                <div className="bg-600 rounded-lg justify-center items-center gap-2.5 inline-flex h-11 sm:my-0">
                  <div className="text-50 text-xl sm:text-2xl font-bold mx-6">
                    <span className="cursor-pointer">Registrarse</span>
                  </div>
                </div>
              </Link>
            </>
          ) : (
            <>
              <div className="w-auto h-14 flex px-4 sm:justify-between justify-center">
                <div className="px-4 rounded-xl bg-300 border border-900 justify-center items-center gap-2.5 inline-flex">
                  <img
                    src={session.user.image}
                    className="flex w-10 h-10 rounded-full bg-purple-100"
                  />
                  <p className="text-purple-900 text-xl font-extrabold text-center w-full">
                    {session.user.name}
                  </p>
                  <button
                    onClick={() => {
                      signOut();
                    }}
                  >
                    <Image
                      src={singout}
                      alt="Sing out"
                      width={40}
                      height={40}
                    />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

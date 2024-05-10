"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../assets/logo-landing.svg";
import ImgUser from "../assets/img_user.svg";
import singout from "../assets/singout.svg";
import ImgMenu from "../assets/img_menu.svg";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import { usePathname, useSearchParams } from "next/navigation";

const Navbar = () => {
  const { data: session }: any = useSession();
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams])

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col items-center justify-center my-4">
      <div className="fixed top-0.5 z-50 bg-50 rounded-xl shadow-xl border border-600/50">
        <div className=" flex flex-col sm:flex-row justify-between items-center px-4 sm:px-8 my-2 md:my-0">
          <div className="flex items-center gap-1">
            <div
              className="h-10 w-10 sm:h-16 sm:w-16"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image src={logo} width={65} height={65} alt="Logo" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-violet-600">
              <Link href="/inicio">MedimeHub</Link>
            </div>
            <div className="sm:hidden flex gap-2 sm:flex-row ml-36 sm:mx-20">
              <button
                onClick={toggleMenu}
                className="text-violet-900 text-xl font-bold my-2 sm:my-0 sm:mx-10"
              >
                <Image src={ImgMenu} alt="Sing out" width={40} height={40} />
              </button>
            </div>
          </div>
          <div className="hidden sm:flex gap-2 sm:flex-row mx-2 sm:mx-20">
            <div className="text-center text-violet-900 text-xl sm:text-2xl font-bold my-2 sm:my-0 sm:mx-6">
              <Link className="cursor-pointer hover:text-600" href="/inicio">
                Inicio
              </Link>
            </div>
            <div className="text-center text-violet-900 text-xl sm:text-2xl font-bold my-2 sm:my-0 sm:mx-10">
              <Link className="cursor-pointer hover:text-600 " href="/about">
                About
              </Link>
            </div>
            <div className="text-center text-violet-900 text-xl sm:text-2xl font-bold my-2 sm:my-0 sm:mx-10">
              <Link className="cursor-pointer hover:text-600 " href="/faq">
                FAQ
              </Link>
            </div>
            {session &&
            (session.user.email === "chavezmele7030@gmail.com" ||
              session.user.email === "jesus@admin.com") ? (
              <div className="text-center text-violet-900 text-xl sm:text-2xl font-bold my-2 sm:my-0 sm:mx-10">
                <Link
                  className="cursor-pointer hover:text-600"
                  href="/dashboard"
                >
                  Dashboard
                </Link>
              </div>
            ) : (
              <></>
            )}
          </div>

          {isOpen && (
            <div className="sm:hidden flex flex-col sm:flex-row mx-2 sm:mx-20">
              <div className="text-center text-violet-900 text-xl sm:text-2xl font-bold my-2 sm:my-0 sm:mx-10">
                <Link className="cursor-pointer hover:text-600" href="/inicio">
                  Inicio
                </Link>
              </div>
              <div className="text-center text-violet-900 text-xl sm:text-2xl font-bold my-2 sm:my-0 sm:mx-10">
                <Link className="cursor-pointer hover:text-600" href="/about">
                  About
                </Link>
              </div>
              <div className="text-center text-violet9900 text-xl sm:text-2xl font-bold my-2 sm:my-0 sm:mx-10">
                <Link className="cursor-pointe hover:text-600" href="/faq">
                  FAQ
                </Link>
              </div>
              {session &&
              (session.user.email === "chavezmele7030@gmail.com" ||
                session.user.email === "jesus@admin.com") ? (
                <div className="text-center text-violet-900 text-xl sm:text-2xl font-bold my-2 sm:my-0 sm:mx-10">
                  <Link
                    className="cursor-pointer hover:text-600"
                    href="/dashboard"
                  >
                    Dashboard
                  </Link>
                </div>
              ) : (
                <></>
              )}
            </div>
          )}
          <div className="sm:flex-row  inline-block flex-col sm:items-center">
            {!session ? (
              <>
                <Link href="/login">
                  <span className="text-purple-900 mx-5 text-2xl font-bold cursor-pointer hover:text-600">
                    Iniciar sesión
                  </span>
                </Link>
              </>
            ) : (
              <>
              <Link href="/profile">
                <div className="w-auto h-14 flex px-4 sm:justify-between justify-center">
                  <div className="px-4 rounded-xl bg-300 border border-900 justify-center items-center gap-2.5 inline-flex">
                    <img
                      src={session.user.image || ImgUser}
                      className="flex w-10 h-10 rounded-full"
                    />
                    <p className="text-purple-900 text-xl font-extrabold text-center w-full break-all">
                      {session.user.name}
                    </p>
                    <button
                      onClick={() => {
                        signOut({ callbackUrl: "/", redirect: true });
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
              </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

"use client";

import Link from "next/link";
import Image from "next/image";
import { signIn, useSession, signOut } from "next-auth/react";
import Styles from "../styles/navbar-landing.module.css";
import { ST } from "next/dist/shared/lib/utils";
import singout from "../assets/singout.svg";


function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className={Styles.navbar}>
      <Link href="/">
      </Link>

      {session?.user ? (
        <div className={Styles.userContainer}>
          <Link href="/dashboard"></Link>
          <img
            src={session.user.image}
            alt=""
            className= {Styles.avatar}	
          />
          <p className={Styles.userName}>
            {session.user.name}
          </p>
          <button className={Styles.btnSingOut}
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
          className={Styles.btnSingIn}	
        >
          Sign In
        </button>
        
      )}
    </nav>
  );
}
export default Navbar;
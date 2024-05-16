"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";


function Page() {
    const router = useRouter();
    const { data: session, status: sessionStatus } = useSession();

    useEffect(() => {
        if (sessionStatus !== "authenticated") {
            router.replace("/inicio");
        }
    }, [sessionStatus, router]);

    if (sessionStatus === "loading") {
        return <div className="flex min-h-screen flex-col items-center justify-between p-24 text-900 font-bold"><h1>Loading...</h1></div>;
    }

    return (
        sessionStatus === "authenticated" && (
            <div className="flex min-h-screen flex-col items-center justify-between p-24">
                <h1 className="bg-red-600 p-4 rounded-2xl text-white">Prescriptions</h1>
            </div>
    )
    );
}

export default Page;
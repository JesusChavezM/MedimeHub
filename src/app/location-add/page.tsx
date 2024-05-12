"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Add = () => {
    const router = useRouter();
    const [error, setError] = useState("");
    const { data: session, status: sessionStatus } = useSession();

    const [name, setName] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");


    useEffect(() => {
        if (sessionStatus !== "authenticated") {
            router.replace("/inicio");
        }
    }, [sessionStatus, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target[0].value;
        const lat = e.target[1].value;
        const lng = e.target[2].value;

        const response = await fetch("/api/locations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, lat, lng}),
        });

        if (response.ok) {
            router.push("/inicio");
        } else {
            setError("Error al registrar el lugar");
        }
    };

    if (sessionStatus === "loading") {
        return <div className="flex min-h-screen flex-col items-center justify-between p-24 text-900 font-bold"><h1>Loading...</h1></div>;
    }

    return (
        sessionStatus === "authenticated" && (
            <div className="flex min-h-screen flex-col items-center justify-between p-24">
                <div className="bg-100 p-8 rounded shadow-md w-96 border border-600">
                    <h1 className="text-900 text-4xl text-center font-bold mb-8">Agregar Lugar</h1>
                    <form onSubmit={handleSubmit}>
                        <span className="text-800 text-md text-center font-bold mb-8">Nombre:</span>
                        <input
                            type="text"
                            value={name}
                            className="w-full border border-600 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-900 focus:text-black"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <span className="text-800 text-md text-center font-bold mb-8">Latitud:</span>
                        <input
                            type="text"
                            value={lat}
                            className="w-full border border-600 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-900 focus:text-black"
                            onChange={(e) => setLat(e.target.value)}
                        />
                        <span className="text-800 text-md text-center font-bold mb-8">Longitud:</span>
                        <input
                            type="text"
                            value={lng}
                            className="w-full border border-600 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-900 focus:text-black"
                            onChange={(e) => setLng(e.target.value)}
                        />
                        <button type="submit" className="w-full bg-600 text-50 py-2 rounded-2xl hover:bg-700 cursor-pointer">Registrar</button>
                    </form>
                    {error && <p>{error}</p>}
                </div>
            </div>
        )
    );
};

export default Add;
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";


function Page() {
    const router = useRouter();
    const { data: session, status: sessionStatus } = useSession();
    const [prescriptions, setPrescriptions] = useState([]);


    useEffect(() => {
        if (sessionStatus !== "authenticated") {
            router.replace("/inicio");
        }
    }, [sessionStatus, router]);

    useEffect(() => {
        const getPrescriptions = async () => {
            const response = await fetch("/api/prescriptions", { cache: "no-cache" });
            const data = await response.json();
            setPrescriptions(data);
        };
        getPrescriptions();
    }, []);

    const viewPrescripcion = (id) => {
        router.push(`/prescription?id=${id}`);
    };

    if (sessionStatus === "loading") {
        return <div className="flex min-h-screen flex-col items-center justify-between p-24 text-900 font-bold"><h1>Loading...</h1></div>;
    }

    return (
        sessionStatus === "authenticated" && (
            <div className="flex items-center justify-center min-h-screen">
                <div className="flex flex-col items-center justify-center mt-32 w-4/5 sm:mt-16">
                    <div className="container mx-auto">
                        <div className="text-center">
                            <h1 className="text-4xl font-semibold text-950">Nuestras <span className="text-700">Recetas Médicas</span></h1>
                            <p className="text-xl text-950 mt-4 text-pretty">
                                Aquí podrás consultar todas tus recetas médicas. Si deseas obtener más información sobre alguna de ellas, simplemente haz clic en el botón "Ver Detalles" y podrás ver todos los detalles de la receta.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 gap-4 p-2">
                            <table className="border-collapse w-full">
                                <thead>
                                    <tr className="bg-purple-200">
                                        <th className="border border-800 p-2">Fecha</th>
                                        <th className="border border-800 p-2">Doctor</th>
                                        <th className="border border-800 p-2">Especialidad</th>
                                        <th className="border border-800 p-2">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {prescriptions.map((prescriptions) => (
                                        <a className="flex text-xl p-1 text-600 font-bold mb-4 mt-24 xl:mt-8 md:mt-8 cursor-pointer hover:bg-200 hover:text-800 bg-50 border border-900 rounded-lg" onClick={() => router.push(`/prescription?id=${prescriptions._id}`)}>
                                            <tr key={prescriptions._id} className="bg-100">
                                                <td className="border border-800 p-2">{prescriptions.date}</td>
                                                <td className="border border-800 p-2">{prescriptions.doctor}</td>
                                                <td className="border border-800 p-2">{prescriptions.specialty}</td>
                                                <td className="border border-800 p-2">
                                                    <button className="bg-200 border border-800 p-2 rounded-lg hover:bg-300 hover:text-800" onClick={() => viewPrescripcion(prescriptions._id)}>Ver Detalles</button>
                                                </td>
                                            </tr>
                                        </a>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}

export default Page;
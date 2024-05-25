"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

function CompletedAppointments() {
    const [error, setError] = useState("");
    const { data: session, status: sessionStatus } = useSession();
    const [citas, setCitas] = useState(null);

    useEffect(() => {
        if (sessionStatus === "authenticated") {
            fetch(`/api/completedAppointments?email=${encodeURIComponent(session.user.email)}&status=1`)
                .then(response => response.json())
                .then(data => setCitas(data))
                .catch(error => {
                    console.error('Error:', error);
                    setError("Error fetching appointments");
                });
        }
    }, [sessionStatus, session]);

    return (
        sessionStatus === "authenticated" && (
            <div className="flex items-center justify-center min-h-screen">
                <div className="flex flex-col items-center justify-center w-4/5 sm:mt-16">
                    <div className="container mx-auto">
                        <div className="text-center">
                            <h1 className="text-4xl font-semibold text-950">Hola <span className="text-700">{session.user.name}</span>, tienes {citas ? citas.length : 0} citas finalizadas</h1>
                        </div>
                        <div className="grid grid-cols-1 gap-4 p-2">
                            <table className="border-collapse w-full">
                                <thead>
                                    <tr className="bg-purple-200">
                                        <th className="border border-800 p-2">Cita No.</th>
                                        <th className="border border-800 p-2">Correo del paciente</th>
                                        <th className="border border-800 p-2">Nombre del paciente</th>
                                        <th className="border border-800 p-2">Fecha</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {citas ? citas.map((cita, index) => (
                                        <tr key={index} className="bg-100 hover:bg-200">
                                            <td className="border border-800 p-2">{index + 1}</td>
                                            <td className="border border-800 p-2">{cita.userEmail}</td>
                                            <td className="border border-800 p-2">{cita.pacientName}</td>
                                            <td className="border border-800 p-2">{new Date(cita.appointmentDate).toLocaleString()}</td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={4} className="border border-800 p-2 text-center">No appointments found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}

export default CompletedAppointments;

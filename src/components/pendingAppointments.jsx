import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import ImgChecked from "../assets/img_checked.svg"
import ImgPrescription from "../assets/img_receta.svg";
import ImgExpedient from "../assets/img_expediente.svg";

function PendingAppointments() {
    const [error, setError] = useState("");
    const { data: session, status: sessionStatus } = useSession();
    const [citas, setCitas] = useState(null);

    useEffect(() => {
        if (sessionStatus === "authenticated" && session.user.role === "doctor") {
            fetch(`/api/pendingAppointments?email=${encodeURIComponent(session.user.email)}`)
                .then(response => response.json())
                .then(data => setCitas(data))
                .catch(error => {
                    console.error('Error:', error);
                    setError("Error fetching appointments");
                });
        }
    }, [sessionStatus, session]);

    const appointmentCount = citas ? citas.length : 0;

    const handleUpdateStatus = async (id) => {
        try {
            const response = await fetch(`/api/pendingAppointments?id=${encodeURIComponent(id)}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}), // No es necesario enviar el ID en el cuerpo de la solicitud
            });

            const data = await response.json();

            if (response.ok) {
                setCitas((prevCitas) => prevCitas.filter(cita => cita._id !== id));
            } else {
                setError(data.error);
            }
        } catch (error) {
            console.error('Error updating appointment status:', error);
            setError("Error updating appointment status");
        }
    };

    return (
        sessionStatus === "authenticated" && (
            <div className="flex items-center justify-center">
                <div className="flex flex-col items-center justify-center w-4/5 mt-4">
                    <div className="container mx-auto">
                        <div className="text-center">
                            <h1 className="text-3xl font-semibold text-950 p-2">Hola <span className="text-700">{session.user.name}</span>, tienes <span className="text-red-600">{appointmentCount}</span> citas pendientes</h1>
                        </div>
                        <div className="grid grid-cols-1 gap-4 p-2">
                            <table className="border-collapse w-full">
                                <thead>
                                    <tr className="bg-purple-200">
                                        <th className="border border-800 p-2">Cita No.</th>
                                        <th className="border border-800 p-2">Correo del paciente</th>
                                        <th className="border border-800 p-2">Nombre del paciente</th>
                                        <th className="border border-800 p-2">Fecha</th>
                                        <th className="border border-800 p-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {citas ? citas.map((cita, index) => (
                                        <tr key={index} className="bg-100 hover:bg-200">
                                            <td className="border border-800 p-2 text-center">{index + 1}</td>
                                            <td className="border border-800 p-2">{cita.userEmail}</td>
                                            <td className="border border-800 p-2">{cita.pacientName}</td>
                                            <td className="border border-800 p-2">{new Date(cita.appointmentDate).toLocaleString()}</td>
                                            <td className="border border-800 p-2">
                                                <Link href={`/createPrescription?id=${cita._id}`} passHref>
                                                    <button className="bg-200 border border-800 p-2 rounded-lg hover:bg-300 hover:text-800 mr-2">
                                                        <Image src={ImgPrescription} alt="Prescription" width={25} height={25}></Image>
                                                    </button>
                                                </Link>
                                                <button className="bg-200 border border-800 p-2 rounded-lg hover:bg-300 hover:text-800" onClick={() => handleAddEntry(cita)}>
                                                    <Image src={ImgExpedient} alt="Add Entry" width={25} height={25}></Image>
                                                </button>
                                                {cita.status === 0 && (
                                                    <button
                                                        className="bg-200 border border-800 p-2 rounded-lg hover:bg-300 hover:text-800 ml-2"
                                                        onClick={() => {
                                                            handleUpdateStatus(cita._id);
                                                        }}
                                                    >
                                                        <Image src={ImgChecked} alt="Check" width={25} height={25}>
                                                        </Image>
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={5} className="border border-800 p-2 text-center">No appointments found</td>
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

export default PendingAppointments;

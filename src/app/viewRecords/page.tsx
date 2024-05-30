"use client";
import react, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import logo from "../../assets/logo-landing.svg";


function viewRecords() {
    const router = useRouter();
    const { data: session, status: sessionStatus } = useSession();
    const [record, setRecords] = useState(null);

    // useEffect(() => {
    //     if (sessionStatus !== "authenticated") {
    //         router.replace("/inicio");
    //     }
    // }, [sessionStatus, router]);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");
        if (sessionStatus === "authenticated") {
            fetch(`/api/record/view?id=${id}`)
                .then(response => response.json())
                .then(data => setRecords(data))
                .catch(error => console.error('Error:', error));
        }
    }, [sessionStatus, session]);

    if (sessionStatus === "loading") {
        return <div className="flex min-h-screen flex-col items-center justify-between p-24 text-900 font-bold"><h1>Loading...</h1></div>;
    }
    console.log(record);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-4/5 sm:mt-16 p-4 bg-white shadow-lg rounded-lg">
                <div className="flex items-center justify-center mb-4 w-full">
                    <h1 className="text-2xl font-bold xl:mt-0 md:mt-0">Expediente de consulta</h1>
                    {session?.user.role === "user" && (
                        <Link
                            className="text-xl p-1 text-600 font-bold  xl:mt-0 md:mt-0 cursor-pointer hover:bg-400 hover:text-100 bg-200 border border-900 rounded-lg fill-current ml-auto shrink-0"
                            href="/records"
                        >
                            Regresar
                        </Link>
                    )}
                    {session?.user.role === "doctor" && (
                        <Link
                            className="text-xl p-1 text-600 font-bold  xl:mt-0 md:mt-0 cursor-pointer hover:bg-400 hover:text-100 bg-200 border border-900 rounded-lg fill-current ml-auto shrink-0"
                            href="/recordsDoctor"
                        >
                            Regresar
                        </Link>
                    )}
                    {session?.user.role === "admin" && (
                        <Link
                            className="text-xl p-1 text-600 font-bold  xl:mt-0 md:mt-0 cursor-pointer hover:bg-400 hover:text-100 bg-200 border border-900 rounded-lg fill-current ml-auto shrink-0"
                            href="/dashboard"
                        >
                            Regresar
                        </Link>
                    )}
                </div>
                {record && (
                    <>
                        <div className="bg-50 rounded-lg shadow-lg p-4 border border-600 ">
                            <div className="w-full p-4 bg-white shadow-lg rounded-lg">
                                <div className="flex justify-between items-center mb-1">
                                    <div className="flex items-center">
                                        <Image src={logo} width={50} height={50} alt="Logo" />
                                        <span className="text-3xl font-bold ml-2 text-gray-600">MedimeHub</span>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="w-1/2 pr-4">
                                        <h2 className="text-lg font-semibold">Datos del paciente</h2>
                                        <div className="flex justify-between">Nombre: <span className="font-bold">{record.patient.name}</span></div>
                                        <div className="flex justify-between">Edad: <span className="font-bold">{record.patient.age}</span></div>
                                        <div className="flex justify-between">Fecha: <span className="font-bold">{new Date(record.date).toLocaleDateString()}</span></div>
                                        <div className="flex justify-between">Direccion <span className="font-bold">{record.patient.address}</span></div>
                                    </div>
                                    <div className="w-1/2 pl-4">
                                        <h2 className="text-lg font-semibold">Datos del médico</h2>
                                        <div className="flex justify-between">Nombre: <span className="font-bold">{record.doctor.name}</span></div>
                                        <div className="flex justify-between">Cédula: <span className="font-bold">{record.doctor.license}</span></div>
                                        <div className="flex justify-between">Especialidad/es: <span className="font-bold">{record.doctor.speciality}</span></div>
                                        <div className="flex justify-between">Teléfono: <span className="font-bold">{record.doctor.phone}</span></div>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <h2 className="text-lg font-semibold mb-4">Signos vitales</h2>
                                    <table className="min-w-full">
                                        <thead>
                                            <tr>
                                                <th className="px-4 font-semibold text-left">Presión arterial</th>
                                                <th className="px-4 font-semibold text-left">Frecuencia cardiaca</th>
                                                <th className="px-4 font-semibold text-left">Peso</th>
                                                <th className="px-4 font-semibold text-left">Estatura</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="bg-gray-200 text-left px-2 py-1 rounded-md">{record.Sings[0].height}</td>
                                                <td className="bg-gray-200 text-left px-2 py-1 rounded-md">{record.Sings[0].heartRate}</td>
                                                <td className="bg-gray-200 text-left px-2 py-1 rounded-md">{record.Sings[0].weight}</td>
                                                <td className="bg-gray-200 text-left px-2 py-1 rounded-md">{record.Sings[0].height}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="flex flex-col mt-4">
                                        <span className="text-lg font-semibold">Enfermedades cronicas</span>
                                        <span className="w-full bg-gray-200 text-left px-2 py-1 rounded-md">{record.history[0].chronicDiseases}</span>
                                        <span className="text-lg font-semibold">Cirugías previas</span>
                                        <span className="w-full bg-gray-200 text-left px-2 py-1 rounded-md">{record.history[0].surgeries}</span>
                                        <span className="text-lg font-semibold">Alergias</span>
                                        <span className="w-full bg-gray-200 text-left px-2 py-1 rounded-md">{record.history[0].allergies}</span>
                                        <span className="text-lg font-semibold">Medicamentos controlados</span>
                                        <span className="w-full bg-gray-200 text-left px-2 py-1 rounded-md">{record.history[0].medications}</span>
                                    </div>
                                    {/* Síntomas de la cita */}
                                    <div className="flex flex-col mt-4">
                                        <span className="text-lg font-semibold">Síntomas</span>
                                        <span className="w-full bg-gray-200 text-left px-2 py-1 rounded-md">{record.appointmentSymptoms[0].symptoms}</span>
                                        <span className="text-lg font-semibold">Diagnóstico</span>
                                        <span className="w-full bg-gray-200 text-left px-2 py-1 rounded-md">{record.appointmentSymptoms[0].diagnosis}</span>
                                    </div>
                                    {/* Observaciones */}
                                    <div className="flex flex-col mt-4">
                                        <span className="text-lg font-semibold">Observaciones</span>
                                        <span className="w-full bg-gray-200 text-left px-2 py-1 rounded-md">{record.observations}</span>
                                    </div>
                                    {/* Botón de envío */}
                                </div>
                            </div>
                        </div>
                    </>
                )
                }
            </div>
        </div >
    );
}

export default viewRecords;
"use client";
import react, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import logo from "../../assets/logo-landing.svg";
import Barcode from "../../assets/img_barCode.svg"

function viewPrescription() {
    const router = useRouter();
    const { data: session, status: sessionStatus } = useSession();
    const [prescription, setPrescription] = useState(null);

    useEffect(() => {
        if (sessionStatus !== "authenticated") {
            router.replace("/inicio");
        }
    }, [sessionStatus, router]);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");
        if (sessionStatus === "authenticated") {
            fetch(`/api/prescriptions/view?id=${id}`)
                .then(response => response.json())
                .then(data => setPrescription(data))
                .catch(error => console.error('Error:', error));
        }
    }, [sessionStatus, session]);

    if (sessionStatus === "loading") {
        return <div className="flex min-h-screen flex-col items-center justify-between p-24 text-900 font-bold"><h1>Loading...</h1></div>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-4/5 sm:mt-16 p-4 bg-white shadow-lg rounded-lg">
                <div className="flex items-center justify-center mb-4 w-full">
                    <h1 className="text-2xl font-bold xl:mt-0 md:mt-0">
                        Detalles de la Receta</h1>
                    {session?.user.role === "user" && (
                        <Link
                            className="text-xl p-1 text-600 font-bold  xl:mt-0 md:mt-0 cursor-pointer hover:bg-400 hover:text-100 bg-200 border border-900 rounded-lg fill-current ml-auto shrink-0"
                            href="/prescriptions"
                        >
                            Regresar
                        </Link>
                    )}

                    {session?.user.role === "doctor" && (
                        <Link
                            className="text-xl p-1 text-600 font-bold  xl:mt-0 md:mt-0 cursor-pointer hover:bg-400 hover:text-100 bg-200 border border-900 rounded-lg fill-current ml-auto shrink-0"
                            href="/appointments"
                        >
                            Regresar
                        </Link>
                    )}
                </div>
                {prescription && (
                    <>
                        <div className="bg-purple-100 rounded-lg shadow-lg p-4 border border-600 ">
                            {/* Encabezado */}
                            <div className="flex justify-between items-center mb-1">
                                <div className="flex items-center">
                                    <Image src={logo} width={100} height={100} alt="Logo" />
                                    <span className="text-3xl font-bold ml-2 text-600">MedimeHub</span>
                                </div>
                                <div className="flex flex-col items-center text-center">
                                    <Image src={Barcode} width={100} height={87.5} alt='barcode' />
                                    <span className="font-bold">{prescription.controlledSubstance.barcode}</span>
                                </div>
                            </div>
                            {/* Datos del paciente y médico */}
                            <div className="flex">
                                {/* Datos del paciente */}
                                <div className="w-1/2 pr-4">
                                    <h2 className="text-lg font-semibold">Datos del paciente</h2>
                                    <p className="flex justify-between">Nombre: <span className="font-bold">{prescription.patient.name}</span></p>
                                    <p className="flex justify-between">Edad: <span className="font-bold">{prescription.patient.age}</span></p>
                                    <p className="flex justify-between">Fecha: <span className="font-bold">{new Date(prescription.date).toLocaleDateString()}</span></p>
                                    <p className="flex justify-between">Receta No. <span className="font-bold">{prescription.controlledSubstance.folioNumber}</span></p>
                                </div>
                                {/* Datos del médico */}
                                <div className="w-1/2 pl-4">
                                    <h2 className="text-lg font-semibold">Datos del médico</h2>
                                    <p className="flex justify-between">Nombre: <span className="font-bold">{prescription.doctor.name}</span></p>
                                    <p className="flex justify-between">Cédula: <span className="font-bold">{prescription.doctor.license}</span></p>
                                    <p className="flex justify-between">Especialidad/es: <span className="font-bold">{prescription.doctor.speciality.join(", ")}</span></p>
                                    <p className="flex justify-between">Teléfono: <span className="font-bold">{prescription.doctor.phone}</span></p>
                                </div>
                            </div>
                            {/* Sección de medicamentos */}
                            <div className="mt-6">
                                <h2 className="text-lg font-semibold mb-4">Medicamentos</h2>
                                <table className="min-w-full">
                                    <thead>
                                        <tr className="">
                                            <th className="px-4 font-semibold text-left">Nombre</th>
                                            <th className="px-4 font-semibold text-left">Dosis</th>
                                            <th className="px-4 font-semibold text-left">Ruta de administración</th>
                                            <th className="px-4 font-semibold text-left">Frecuencia</th>
                                            <th className="px-4 font-semibold text-left">Duración</th>
                                            <th className="px-4 font-semibold text-left">Instrucciones adicionales</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {prescription.treatment.map((item, index) => (
                                            <tr key={index} className="border-b">
                                                <td className="px-4 py-2 text-left">{item.medicationName}</td>
                                                <td className="px-4 py-2 text-left">{item.dosage}</td>
                                                <td className="px-4 py-2 text-left">{item.routeOfAdministration}</td>
                                                <td className="px-4 py-2 text-left">{item.frequency}</td>
                                                <td className="px-4 py-2 text-left">{item.duration}</td>
                                                <td className="px-4 py-2 text-left">{item.additionalInstructions}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <p>Instrucciones del médico: <span className="font-bold">{prescription.doctorInstructions}</span></p>
                            </div>
                            {/* Detalles adicionales */}
                            <div className="mt-8 flex flex-col items-center text-center">
                                <span className="font-bold">{prescription.doctorSignature}</span>
                                <p>Firma del Doctor</p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div >
    );
}

export default viewPrescription;
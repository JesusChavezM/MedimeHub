"use client";
import react, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

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

    // console.log(prescription);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div>
                <Link href="/prescriptions">Regresar</Link>
            </div>
            <div className="w-4/5 sm:mt-16 p-4 bg-white shadow-lg rounded-lg">
                <h2>Detalles de la prescripción:</h2>
                {prescription && (
                    <>
                        <div>
                            <div>
                                <h1>Datos del paciente</h1>
                                <p>Nombre del paciente: {prescription.patient.name}</p>
                                <p>Edad: {prescription.patient.age}</p>
                            </div>
                            <div>
                                <h1>Datos del medico</h1>
                                <p>Nombre del medico: {prescription.doctor.name}</p>
                                <p>Cedula: {prescription.doctor.license}</p>
                                <p>Especialidad/es: {prescription.doctor.speciality.join(", ")}</p>
                                <p>Telefono: {prescription.doctor.phone}</p>
                            </div>
                            <div>
                                <h2>Detalles del Medicamento:</h2>
                                <p>Nombre del medicamento: {prescription.treatment[0].medicationName}</p>
                                <p>Dosis: {prescription.treatment[0].dosage}</p>
                                <p>Ruta de administración: {prescription.treatment[0].routeOfAdministration}</p>
                                <p>Frecuencia: {prescription.treatment[0].frequency}</p>
                                <p>Duración: {prescription.treatment[0].duration}</p>
                                <p>Instrucciones adicionales: {prescription.treatment[0].additionalInstructions}</p>
                            </div>
                            <div>
                                <h2>Detalles adicionales:</h2>
                                <p>Instrucciones del médico: {prescription.doctorInstructions}</p>
                                <p>Firma del Dr. Pérez: {prescription.doctorSignature}</p>
                                <p>Número de folio: {prescription.controlledSubstance.folioNumber}</p>
                                <p>Código de barras: {prescription.controlledSubstance.barcode}</p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default viewPrescription;
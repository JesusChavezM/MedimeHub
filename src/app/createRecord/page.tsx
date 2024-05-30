"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import logo from "../../assets/logo-landing.svg";
import Add from "../../assets/img_open.svg"
import Link from "next/link";

function CreateRecord() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [cita, setCita] = useState(null);
    const [error, setError] = useState(null);
    const [citaUser, setCitaUser] = useState(null);
    const [sessionUser, setSessionUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status !== "authenticated") {
            router.push("/login");
            return;
        }

        const fetchData = async () => {
            try {
                const urlParams = new URLSearchParams(window.location.search);
                const id = urlParams.get("id");

                const appointmentResponse = await fetch(`/api/createRecord/appointment?id=${encodeURIComponent(id)}`);
                const appointmentData = await appointmentResponse.json();
                setCita(appointmentData);

                const sessionUserResponse = await fetch(`/api/createRecord/user?email=${encodeURIComponent(session.user.email)}`);
                const sessionUserData = await sessionUserResponse.json();
                setSessionUser(sessionUserData);

                const citaUserResponse = await fetch(`/api/createRecord/user?email=${encodeURIComponent(appointmentData.userEmail)}`);
                const citaUserData = await citaUserResponse.json();
                setCitaUser(citaUserData);

            } catch (error) {
                console.error("Error:", error);
                setError('Error fetching data from the server');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [status, session, router]);

    const generateAge = (dateOfBirth) => {
        const currentDate = new Date();
        const birthDate = new Date(dateOfBirth);
        let ageDiff = currentDate.getFullYear() - birthDate.getFullYear();
        const isBirthdayPassed = (
            currentDate.getMonth() > birthDate.getMonth() ||
            (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() >= birthDate.getDate())
        );
        if (!isBirthdayPassed) {
            ageDiff--;
        }
        return ageDiff;
    };

    const generateID = () => {
        const min = 1000000;
        const max = 9999999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const doctorEmail = sessionUser?.email;
        const patientEmail = citaUser?.email;
        const folio = generateID();
        const doctorName = sessionUser?.name;
        const doctorLicense = sessionUser?.license;
        const doctorSpeciality = sessionUser?.speciality;
        const doctorPhone = sessionUser?.phone;
        const patientName = citaUser?.name;
        const patientAge = generateAge(citaUser?.birthdate);
        const patientDateOfBirth = citaUser?.birthdate;
        const patientAddress = citaUser?.address;

        const singsBloodPressure = e.target.singsBloodPressure.value;
        const singsHeartRate = e.target.singsHeartRate.value;
        const singsWeight = e.target.singsWeight.value;
        const singsHeight = e.target.singsHeight.value;
        const historyChronicDiseases = e.target.historyChronicDiseases.value;
        const historySurgeries = e.target.historySurgeries.value;
        const historyAllergies = e.target.historyAllergies.value;
        const historyMedications = e.target.historyMedications.value;
        const appointmentSymptomsSymptoms = e.target.appointmentSymptomsSymptoms.value;
        const appointmentSymptomsDiagnosis = e.target.appointmentSymptomsDiagnosis.value;
        const observations = e.target.observations.value;

        try {
            const res = await fetch("/api/record", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    doctorEmail,
                    patientEmail,
                    folio,
                    doctorName,
                    doctorLicense,
                    doctorSpeciality,
                    doctorPhone,
                    patientName,
                    patientAge,
                    patientDateOfBirth,
                    patientAddress,
                    singsBloodPressure,
                    singsHeartRate,
                    singsWeight,
                    singsHeight,
                    historyChronicDiseases,
                    historySurgeries,
                    historyAllergies,
                    historyMedications,
                    appointmentSymptomsSymptoms,
                    appointmentSymptomsDiagnosis,
                    observations,
                }),
            });
            if (!res.ok) {
                throw new Error("Failed to create record");
            } else {
                router.push("/records");
            }
        } catch (error) {
            console.error("Error:", error);
            setError("Error creating record");
        }
    };

    if (loading) {
        return <div className="flex min-h-screen flex-col items-center justify-between p-24 text-900 font-bold"><h1>Loading...</h1></div>;
    }

    if (error) {
        return <div className="flex min-h-screen flex-col items-center justify-between p-24 text-900 font-bold"><h1>{error}</h1></div>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen min-w-full overflow-x-auto">
            <div className="w-4/5 sm:mt-16 p-4 bg-white shadow-lg rounded-lg">
                <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center">
                        <Image src={logo} width={50} height={50} alt="Logo" />
                        <span className="text-3xl font-bold ml-2 text-gray-600">MedimeHub</span>
                    </div>
                </div>
                <div className="flex">
                    <div className="w-1/2 pr-4">
                        <h2 className="text-lg font-semibold">Datos del paciente</h2>
                        <div className="flex justify-between">Nombre: <span className="font-bold">{citaUser?.name}</span></div>
                        <div className="flex justify-between">Edad: <span className="font-bold">{generateAge(citaUser?.birthdate)}</span></div>
                        <div className="flex justify-between">Fecha: <span className="font-bold">{new Date().toLocaleDateString()}</span></div>
                        <div className="flex justify-between">Receta No. <span className="font-bold">{generateID()}</span></div>
                    </div>
                    <div className="w-1/2 pl-4">
                        <h2 className="text-lg font-semibold">Datos del médico</h2>
                        <div className="flex justify-between">Nombre: <span className="font-bold">{sessionUser?.name}</span></div>
                        <div className="flex justify-between">Cédula: <span className="font-bold">{sessionUser?.license}</span></div>
                        <div className="flex justify-between">Especialidad/es: <span className="font-bold">{sessionUser?.speciality}</span></div>
                        <div className="flex justify-between">Teléfono: <span className="font-bold">{sessionUser?.phone}</span></div>
                    </div>
                </div>
                <div className="mt-6 min-w-full">
                    <form onSubmit={handleSubmit} className="w-full">
                        <table className="w-full">
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
                                    <td><input type="text" className="w-full bg-gray-200 text-left px-2 py-1 rounded-md" name="singsBloodPressure" placeholder="Presión arterial" /></td>
                                    <td><input type="text" className="w-full bg-gray-200 text-left px-2 py-1 rounded-md" name="singsHeartRate" placeholder="Frecuencia cardiaca" /></td>
                                    <td><input type="text" className="w-full bg-gray-200 text-left px-2 py-1 rounded-md" name="singsWeight" placeholder="Peso" /></td>
                                    <td><input type="text" className="w-full bg-gray-200 text-left px-2 py-1 rounded-md" name="singsHeight" placeholder="Estatura" /></td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="flex flex-col mt-4">
                            <span className="text-lg font-semibold">Enfermedades cronicas</span>
                            <input type="text" className="w-full bg-gray-200 text-left px-2 py-1 rounded-md" name="historyChronicDiseases" placeholder="Enfermedades crónicas" />
                            <span className="text-lg font-semibold">Cirugías previas</span>
                            <input type="text" className="w-full bg-gray-200 text-left px-2 py-1 rounded-md" name="historySurgeries" placeholder="Cirugías previas" />
                            <span className="text-lg font-semibold">Alergias</span>
                            <input type="text" className="w-full bg-gray-200 text-left px-2 py-1 rounded-md" name="historyAllergies" placeholder="Alergias" />
                            <span className="text-lg font-semibold">Medicamentos controlados</span>
                            <input type="text" className="w-full bg-gray-200 text-left px-2 py-1 rounded-md" name="historyMedications" placeholder="Medicamentos" />
                        </div>

                        {/* Síntomas de la cita */}
                        <div className="flex flex-col mt-4">
                            <span className="text-lg font-semibold">Síntomas</span>
                            <input type="text" className="w-full bg-gray-200 text-left px-2 py-1 rounded-md" name="appointmentSymptomsSymptoms" placeholder="Síntomas" />
                            <span className="text-lg font-semibold">Diagnóstico</span>
                            <input type="text" className="w-full bg-gray-200 text-left px-2 py-1 rounded-md" name="appointmentSymptomsDiagnosis" placeholder="Diagnóstico" />
                        </div>

                        {/* Observaciones */}
                        <div className="flex flex-col mt-4">
                            <span className="text-lg font-semibold">Observaciones</span>
                            <textarea className="w-full bg-gray-200 text-left px-2 py-1 rounded-md" name="observations" placeholder="Observaciones" />
                        </div>
                        {/* Botón de envío */}
                        <div className="flex justify-center items-center my-4">
                            <button type="submit" className="text-xl p-1 text-gray-600 font-bold cursor-pointer hover:bg-gray-400 hover:text-white bg-gray-200 border border-gray-900 rounded-lg">
                                Agregar al expediente
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default CreateRecord;
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

function CreatePrescription() {
    const router = useRouter();
    const { data: sessionData, status } = useSession();
    const { data: session, status: sessionStatus } = useSession();
    const [cita, setCita] = useState(null);
    const [error, setError] = useState(null);
    const [citaUser, setCitaUser] = useState(null);
    const [sessionUser, setSessionUser] = useState(null);

    useEffect(() => {
        if (sessionStatus !== "authenticated") {
            router.replace("/inicio");
        }
    }, [sessionStatus, router]);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");
        const fetchAppointment = async () => {
            try {
                const response = await fetch(`/api/createPrescription/appointment?id=${encodeURIComponent(id)}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setCita(data);
            } catch (error) {
                console.error("Error:", error);
                setError('Error fetching data from the server');
            }
        };
        fetchAppointment();
    }, []);

    useEffect(() => {
        const fetchUserByEmail = async (email, setUser) => {
            try {
                const response = await fetch(`/api/createPrescription/user?email=${encodeURIComponent(email)}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error("Error:", error);
                setError('Error fetching user data from the server');
            }
        };

        if (cita && cita.userEmail) {
            fetchUserByEmail(cita.userEmail, setCitaUser);
        }
    }, [cita]);

    useEffect(() => {

        const fetchUserByEmail = async (email, setUser) => {
            try {
                const response = await fetch(`/api/createPrescription/user?email=${encodeURIComponent(email)}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error("Error:", error);
                setError('Error fetching user data from the server');
            }
        };

        if (status === "authenticated" && sessionData && sessionData.user && sessionData.user.email) {
            fetchUserByEmail(sessionData.user.email, setSessionUser);
        }
    }, [sessionData]);

    function generateFolio() {
        const min = 1000000;
        const max = 9999999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    function generateBarCode() {
        const min = 10000000;
        const max = 99999999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    function generateAge(dateOfBirth) {
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
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const patientEmail = citaUser?.email;
        const doctorName = e.target[0].value;
        const doctorLicense = e.target[1].value;
        const doctorSpeciality = e.target[2].value;
        const doctorPhone = e.target[3].value;
        const patientName = e.target[4].value;
        const patientAge = e.target[5].value;
        const patientDateOfBirth = e.target[6].value;
        const patientAddress = e.target[7].value;
        const medicationName = e.target[8].value;
        const dosage = e.target[9].value;
        const routeOfAdministration = e.target[10].value;
        const frequency = e.target[11].value;
        const duration = e.target[12].value;
        const additionalInstructions = e.target[13].value;
        const doctorInstructions = e.target[14].value;
        const doctorSignature = e.target[15].value;
        const controlledSubstanceFolioNumber = e.target[16].value;
        const controlledSubstanceBarcode = e.target[17].value;

        try {
            const res = await fetch("/api/prescriptions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    patientEmail,
                    doctorName,
                    doctorLicense,
                    doctorSpeciality,
                    doctorPhone,
                    patientName,
                    patientAge,
                    patientDateOfBirth,
                    patientAddress,
                    medicationName,
                    dosage,
                    routeOfAdministration,
                    frequency,
                    duration,
                    additionalInstructions,
                    doctorInstructions,
                    doctorSignature,
                    controlledSubstanceFolioNumber,
                    controlledSubstanceBarcode
                }),
            });
            if (res.status === 400) {
                setError("This email is already registered");
            }
        } catch (error) {
            setError("Error, try again");
            console.log(error);
        }
    };


    if (sessionStatus === "loading") {
        return <div className="flex min-h-screen flex-col items-center justify-between p-24 text-900 font-bold"><h1>Loading...</h1></div>;
    }

    console.log("Informacion de la cita", cita);
    console.log("Informacion del usuario de la cita", citaUser);
    console.log("Informacion del doctor de la sesion", sessionUser);

    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <form onSubmit={handleSubmit} className="w-full max-w-lg">
                <span>Nombre del doctor</span>
                <input type="text" className="w-full border border-gray-300 rounded-md" value={sessionUser?.name} readOnly/>
                <span>Cedula</span>
                <input type="text" className="w-full border border-gray-300 rounded-md" value={sessionUser?.license} readOnly/>
                <span>Especialidad</span>
                <input type="text" className="w-full border border-gray-300 rounded-md" value={sessionUser?.speciality} readOnly/>
                <span>Telefono</span>
                <input type="text" className="w-full border border-gray-300 rounded-md" value={sessionUser?.phone} readOnly/>
                <span>Nombre del paciente</span>
                <input type="text" className="w-full border border-gray-300 rounded-md" value={citaUser?.name} readOnly/>
                <span>Edad</span>
                <input type="text" className="w-full border border-gray-300 rounded-md" value={generateAge(citaUser?.birthdate)} readOnly/>
                <span>Fecha de nacimiento</span>
                <input type="text" className="w-full border border-gray-300 rounded-md" value={citaUser?.birthdate} readOnly/>
                <span>Direccion</span>
                <input type="text" className="w-full border border-gray-300 rounded-md" value={citaUser?.address} readOnly/>
                <span>Nombre del medicamento</span>
                <input type="text" className="w-full border border-gray-300 rounded-md"/>
                <span>Dosis</span>
                <input type="text" className="w-full border border-gray-300 rounded-md"/>
                <span>Ruta de administracion</span>
                <input type="text" className="w-full border border-gray-300 rounded-md"/>
                <span>Frecuencia</span>
                <input type="text" className="w-full border border-gray-300 rounded-md"/>
                <span>Duracion</span>
                <input type="text" className="w-full border border-gray-300 rounded-md"/>
                <span>Instrucciones adicionales</span>
                <input type="text" className="w-full border border-gray-300 rounded-md"/>
                <span>Instrucciones del doctor</span>
                <input type="text" className="w-full border border-gray-300 rounded-md"/>
                <span>Firma del doctor</span>
                <input type="text" className="w-full border border-gray-300 rounded-md"/>
                <span>Folio de sustancia controlada</span>
                <input type="text" className="w-full border border-gray-300 rounded-md" value={generateFolio()} readOnly/>
                <span>Codigo de barras de sustancia controlada</span>
                <input type="text" className="w-full border border-gray-300 rounded-md" value={generateBarCode()} readOnly/>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Crear receta</button>
            </form>
        </div>
    );
}

export default CreatePrescription;

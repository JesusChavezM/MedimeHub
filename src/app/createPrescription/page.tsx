"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import logo from "../../assets/logo-landing.svg";
import Barcode from "../../assets/img_barCode.svg";
import Add from "../../assets/img_open.svg"
import Link from "next/link";

function CreatePrescription() {
    const router = useRouter();
    const { data: sessionData, status } = useSession();
    const { data: session, status: sessionStatus } = useSession();
    const [cita, setCita] = useState(null);
    const [error, setError] = useState(null);
    const [citaUser, setCitaUser] = useState(null);
    const [sessionUser, setSessionUser] = useState(null);
    const [medicamentos, setMedicamentos] = useState([{ key: 0 }]);

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

    const agregarMedicamento = () => {
        const newKey = medicamentos.length;
        setMedicamentos([...medicamentos, { key: newKey }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Datos del médico y del paciente que no provienen del formulario
        const doctorEmail = sessionUser?.email;
        const patientEmail = citaUser?.email;
        const doctorName = sessionUser?.name;
        const doctorLicense = sessionUser?.license;
        const doctorSpeciality = sessionUser?.speciality;
        const doctorPhone = sessionUser?.phone;
        const patientName = citaUser?.name;
        const patientAge = generateAge(citaUser?.birthdate);
        const patientDateOfBirth = citaUser?.birthdate;
        const patientAddress = citaUser?.address;

        // Recopilar datos de todos los medicamentos
        // Recopilar datos de todos los medicamentos
        const treatment = [];
        for (let i = 0; i < e.target.length - 6; i += 6) {
            const medicationName = e.target[i].value;
            const dosage = e.target[i + 1].value;
            const routeOfAdministration = e.target[i + 2].value;
            const frequency = e.target[i + 3].value;
            const duration = e.target[i + 4].value;
            const additionalInstructions = e.target[i + 5].value;
            treatment.push({ medicationName, dosage, routeOfAdministration, frequency, duration, additionalInstructions });
        }

        // Otros datos que no se extraen del formulario
        const doctorInstructions = e.target[e.target.length - 2].value;
        const doctorSignature = sessionUser?.name;

        const controlledSubstanceFolioNumber = generateFolio();
        const controlledSubstanceBarcode = generateBarCode();

        try {
            const res = await fetch("/api/prescriptions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    doctorEmail,
                    patientEmail,
                    doctorName,
                    doctorLicense,
                    doctorSpeciality,
                    doctorPhone,
                    patientName,
                    patientAge,
                    patientDateOfBirth,
                    patientAddress,
                    treatment,
                    doctorInstructions,
                    doctorSignature,
                    controlledSubstanceFolioNumber,
                    controlledSubstanceBarcode
                }),
            });
            if (res.status === 400) {
                setError("Este correo electrónico ya está registrado");
            } else if (res.ok) {
                const responseData = await res.text();
                console.log("Respuesta del servidor:", responseData);
                router.push("/appointments");
            }
        } catch (error) {
            setError("Error, inténtalo de nuevo");
            console.log(error);
        }
    };

    if (sessionStatus === "loading") {
        return <div className="flex min-h-screen flex-col items-center justify-between p-24 text-900 font-bold"><h1>Loading...</h1></div>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen min-w-full overflow-x-auto">
            <div className="w-4/5 sm:mt-16 p-4 bg-white shadow-lg rounded-lg">
                {/* Encabezado */}
                <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center">
                        <Image src={logo} width={100} height={100} alt="Logo" />
                        <span className="text-3xl font-bold ml-2 text-600">MedimeHub</span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <Image src={Barcode} width={100} height={87.5} alt='barcode' />
                        <span className="font-bold">{generateBarCode()}</span>
                    </div>
                </div>
                {/* Datos del paciente y médico */}
                <div className="flex">
                    {/* Datos del paciente */}
                    <div className="w-1/2 pr-4">
                        <h2 className="text-lg font-semibold">Datos del paciente</h2>
                        <p className="flex justify-between">Nombre: <span className="font-bold">{citaUser?.name}</span></p>
                        <p className="flex justify-between">Edad: <span className="font-bold">{generateAge(citaUser?.birthdate)}</span></p>
                        <p className="flex justify-between">Fecha: <span className="font-bold">{new Date().toLocaleDateString()}</span></p>
                        <p className="flex justify-between">Receta No. <span className="font-bold">{generateFolio()}</span></p>
                    </div>
                    {/* Datos del médico */}
                    <div className="w-1/2 pl-4">
                        <h2 className="text-lg font-semibold">Datos del médico</h2>
                        <p className="flex justify-between">Nombre: <span className="font-bold">{sessionUser?.name}</span></p>
                        <p className="flex justify-between">Cédula: <span className="font-bold">{sessionUser?.license}</span></p>
                        <p className="flex justify-between">Especialidad/es: <span className="font-bold">{sessionUser?.speciality}</span></p>
                        <p className="flex justify-between">Teléfono: <span className="font-bold">{sessionUser?.phone}</span></p>
                    </div>
                </div>
                <div className="mt-6 min-w-full">
                    <form onSubmit={handleSubmit} className="w-full">
                        <table className="max-w-full">
                            <thead>
                                <tr>
                                    <th className="px-4 font-semibold text-left">Medicamento</th>
                                    <th className="px-4 font-semibold text-left">Dosis</th>
                                    <th className="px-4 font-semibold text-left">Ruta de administración</th>
                                    <th className="px-4 font-semibold text-left">Frecuencia</th>
                                    <th className="px-4 font-semibold text-left">Duración</th>
                                    <th className="px-4 font-semibold text-left">Instrucciones adicionales</th>
                                </tr>
                            </thead>
                            <tbody>
                                {medicamentos.map((medicamento, index) => (
                                    <tr key={medicamento.key}>
                                        <td><input type="text" className="w-full bg-gray-200 text-left px-2 py-1 rounded-md" name={`medicamento${index}.medicationName`} /></td>
                                        <td><input type="text" className="w-full bg-gray-200 text-left px-2 py-1 rounded-md" name={`medicamento${index}.dosage`} /></td>
                                        <td><input type="text" className="w-full bg-gray-200 text-left px-2 py-1 rounded-md" name={`medicamento${index}.routeOfAdministration`} /></td>
                                        <td><input type="text" className="w-full bg-gray-200 text-left px-2 py-1 rounded-md" name={`medicamento${index}.frequency`} /></td>
                                        <td><input type="text" className="w-full bg-gray-200 text-left px-2 py-1 rounded-md" name={`medicamento${index}.duration`} /></td>
                                        <td><input type="text" className="w-full bg-gray-200 text-left px-2 py-1 rounded-md" name={`medicamento${index}.additionalInstructions`} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex justify-center items-start my-4">
                            <button type="button" className="text-500 hover:text-700 p-2 bg-200 rounded-lg border border-600" onClick={agregarMedicamento}>
                                <Image src={Add} width={25} height={25} alt="Agregar medicamento" />
                            </button>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <span className="text-lg font-semibold">Instrucciones del doctor</span>
                            <input type="text" className="w-full bg-gray-200 text-left px-2 py-1 rounded-md" name="doctorInstructions" />
                        </div>
                        <div className="flex justify-center items-center my-4">
                            <button type="submit" className="text-xl p-1 text-600 font-bold cursor-pointer hover:bg-400 hover:text-100 bg-200 border border-900 rounded-lg fill-current">
                                Crear Receta
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreatePrescription;

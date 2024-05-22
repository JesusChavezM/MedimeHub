"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const RegisterDoctor = () => {

    const router = useRouter();
    const [error, setError] = useState('');
    const { data: session, status: sessionStatus } = useSession();

    useEffect(() => {
        if (sessionStatus === 'authenticated') {
            router.replace('/inicio');
        }
    }, [sessionStatus, router]);

    const isValidEmail = (email: string) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = e.target[0].value;
        const password = e.target[1].value;
        const name = e.target[2].value
        const gender = e.target[3].value
        const birthdate = e.target[4].value
        const phone = e.target[5].value
        const address = e.target[6].value
        const state = e.target[7].value
        const country = e.target[8].value
        const zipCode = e.target[9].value
        const license = e.target[10].value
        const speciality = e.target[11].value
        const clinic = e.target[12].value
        const hospital = e.target[13].value

        if (!isValidEmail(email)) {
            setError("Email is invalid");
            return;
        }

        if (!password || password.length < 8) {
            setError("Password is invalid");
            return;
        }

        try {
            const res = await fetch('/api/register-doctor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, name, gender, birthdate, phone, address, state, country, zipCode, license, speciality, clinic, hospital })
            });
            if (res.status === 400) {
                setError("This email is already registered");
            }
            if (res.status === 200) {
                setError("");
                router.push("/inicio");
            }
        } catch (error) {
            setError("Error, try again");
            console.log(error);
        }
    };

    if (sessionStatus === "loading") {
        return <div className="flex min-h-screen flex-col items-center justify-between p-24 text-900 font-bold"><h1>Loading...</h1></div>;
    }

    return (
        sessionStatus !== 'authenticated' && (

            <div className="flex min-h-screen flex-col items-center justify-between p-24">
                <div className="bg-100 p-8 rounded shadow-md w-96 border border-600">
                    <h1 className="text-600 text-4xl text-center font-bold mb-8">Registrate Ahora</h1>
                    <form onSubmit={handleSubmit}>
                        <span className="text-800 text-md text-center font-bold mb-8">Correo:</span>
                        <input
                            type="text"
                            className="w-full border border-600 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-900 focus:text-black"
                            placeholder="Correo"
                            required
                        />
                        <span className="text-800 text-md text-center font-bold mb-8">Contraseña:</span>
                        <input
                            type="password"
                            className="w-full border border-600 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-900 focus:text-black"
                            placeholder="Contraseña"
                            required
                        />
                        <span className="text-800 text-md text-center font-bold mb-8">Nombre:</span>
                        <input
                            type="text"
                            className="w-full border border-600 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-900 focus:text-black"
                            placeholder="Nombre"
                            required
                        />
                        <span className="text-800 text-md text-center font-bold mb-8">Genero:</span>
                        <select
                            className="w-full border border-600 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-900 focus:text-black"
                            required
                        >
                            <option value="">Selecciona el género</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                            <option value="Otro">Otro</option>
                        </select>
                        <span className="text-800 text-md text-center font-bold mb-8">Fecha de Nacimiento:</span>
                        <input
                            type="date"
                            className="w-full border border-600 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-900 focus:text-black"
                            placeholder="Fecha de Nacimiento"
                            required
                        />
                        <span className="text-800 text-md text-center font-bold mb-8">Telefono:</span>
                        <input
                            type="text"
                            className="w-full border border-600 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-900 focus:text-black"
                            placeholder="Telefono"
                            required
                        />
                        <span className="text-800 text-md text-center font-bold mb-8">Direccion:</span>
                        <input
                            type="text"
                            className="w-full border border-600 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-900 focus:text-black"
                            placeholder="Direccion"
                            required
                        />
                        <span className="text-800 text-md text-center font-bold mb-8">Estado:</span>
                        <input
                            type="text"
                            className="w-full border border-600 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-900 focus:text-black"
                            placeholder="Estado"
                            required
                        />
                        <span className="text-800 text-md text-center font-bold mb-8">Pais:</span>
                        <input
                            type="text"
                            className="w-full border border-600 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-900 focus:text-black"
                            placeholder="Pais"
                            required
                        />
                        <span className="text-800 text-md text-center font-bold mb-8">Codigo Postal:</span>
                        <input
                            type="text"
                            className="w-full border border-600 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-900 focus:text-black"
                            placeholder="Codigo Postal"
                            required
                        />
                        <span className="text-800 text-md text-center font-bold mb-8">Licencia:</span>
                        <input
                            type="text"
                            className="w-full border border-600 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-900 focus:text-black"
                            placeholder="Licencia"
                            required
                        />
                        <span className="text-800 text-md text-center font-bold mb-8">Especialidad:</span>
                        <input
                            type="text"
                            className="w-full border border-600 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-900 focus:text-black"
                            placeholder="Especialidad"
                            required
                        />
                        <span className="text-800 text-md text-center font-bold mb-8">Consultorio:</span>
                        <input
                            type="text"
                            className="w-full border border-600 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-900 focus:text-black"
                            placeholder="Clinica"
                            required
                        />
                        <span className="text-800 text-md text-center font-bold mb-8">Hospital:</span>
                        <input
                            type="text"
                            className="w-full border border-600 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-900 focus:text-black"
                            placeholder="Hospital"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full bg-900 text-white rounded px-3 py-2 mt-4 focus:outline-none focus:bg-800"
                        > Registrarse </button>
                    </form>
                </div>
            </div>
        )
    );
};

export default RegisterDoctor;
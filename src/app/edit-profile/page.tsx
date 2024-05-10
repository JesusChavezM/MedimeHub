"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Register = () => {
    const router = useRouter();
    const [error, setError] = useState("");
    const { data: session, status: sessionStatus } = useSession();

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [zipCode, setZipCode] = useState("");


    useEffect(() => {
        if (sessionStatus !== "authenticated") {
            router.replace("/inicio");
        }
    }, [sessionStatus, router]);

    const isValidEmail = (email: string) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
    };
    useEffect(() => {
        if (sessionStatus === "authenticated") {
            fetch(`/api/user?email=${session.user.email}`)
                .then(response => response.json())
                .then(data => {
                    setEmail(data.email);
                    setName(data.name);
                    setGender(data.gender);
                    setBirthdate(data.birthdate);
                    setPhone(data.phone);
                    setAddress(data.address);
                    setState(data.state);
                    setCountry(data.country);
                    setZipCode(data.zipCode);
                })
                .catch(error => console.error('Error:', error));
        }
    }, [sessionStatus, session]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const name = e.target[1].value;
        const gender = e.target[2].value;
        const birthdate = e.target[3].value;
        const phone = e.target[4].value;
        const address = e.target[5].value;
        const state = e.target[6].value;
        const country = e.target[7].value;
        const zipCode = e.target[8].value;

        try {
            const res = await fetch(`/api/users?email=${session.user.email}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    name,
                    gender,
                    birthdate,
                    phone,
                    address,
                    state,
                    country,
                    zipCode,
                }),
            });
            if (res.status === 400) {
                setError("This email is already registered");
            }
            if (res.status === 200) {
                setError("");
                router.push("/profile");
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
        sessionStatus === "authenticated" && (
            <div className="flex min-h-screen flex-col items-center justify-between p-24">
                <div className="bg-100 p-8 rounded shadow-md w-96 border border-600">
                    <h1 className="text-900 text-4xl text-center font-bold mb-8">Editar tu Perfil</h1>
                    <form onSubmit={handleSubmit}>
                        <span className="text-800 text-md text-center font-bold mb-8">Email</span>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-600 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-900 focus:text-black"
                            placeholder="Correo"
                            readOnly
                        />
                        <span className="text-800 text-md text-center font-bold mb-8">Nombre</span>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border border-600 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-900 focus:text-black"
                            placeholder="Nombre"
                            required
                        />
                        <span className="text-800 text-md text-center font-bold mb-8">Sexo</span>
                        <select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            className="w-full border border-600 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-900 focus:text-black"
                            required
                        >
                            <option value="">Selecciona el género</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                            <option value="Otro">Otro</option>
                        </select>

                        <span className="text-800 text-md text-center font-bold mb-8">Fecha de nacimiento</span>
                        <input
                            type="date"
                            value={birthdate}
                            onChange={(e) => setBirthdate(e.target.value)}
                            className="w-full border border-600 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-900 focus:text-black"
                            placeholder="Fecha de nacimiento"
                            required
                        />
                        <span className="text-800 text-md text-center font-bold mb-8">Teléfono</span>
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full border border-600 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-900 focus:text-black"
                            placeholder="Teléfono"
                            required
                        />
                        <span className="text-800 text-md text-center font-bold mb-8">Dirección</span>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full border border-600 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-900 focus:text-black"
                            placeholder="Dirección"
                            required
                        />
                        <span className="text-800 text-md text-center font-bold mb-8">Estado</span>
                        <input
                            type="text"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            className="w-full border border-600 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-900 focus:text-black"
                            placeholder="Estado"
                            required
                        />
                        <span className="text-800 text-md text-center font-bold mb-8">País</span>
                        <input
                            type="text"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="w-full border border-600 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-900 focus:text-black"
                            placeholder="País"
                            required
                        />
                        <span className="text-800 text-md text-center font-bold mb-8">Código Postal</span>
                        <input
                            type="text"
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            className="w-full border border-600 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-900 focus:text-black"
                            placeholder="Código postal"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full bg-600 text-50 py-2 rounded-2xl hover:bg-700 cursor-pointer"
                        >
                            {" "}
                            Actualizar Perfil
                        </button>
                        <p className="text-red-600 text-[16px] mb-4">{error && error}</p>
                    </form>
                </div>
            </div>
        )
    );
};

export default Register;

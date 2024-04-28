"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

function RegisterDoctor() {
  const router = useRouter();
  const [error, setError] = useState("");
  const { data: session, status: sessionStatus } = useSession();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const license = e.target[0].value;
    const name = e.target[1].value;
    let speciality = e.target[2].value; // Cambiado a let para poder reasignarlo
    const phone = e.target[3].value;
    const clinic = e.target[4].value;
    const hospital = e.target[5].value;

    if (typeof speciality === 'string') {
      speciality = speciality.split(',').map((s: string) => s.trim());
    }

    try {
      const res = await fetch("/api/doctors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          license,
          name,
          speciality,
          phone,
          clinic,
          hospital,
        }),
        
      });
      if (res.status === 400) {
        setError("This email is already registered");
      }
      if (res.status === 200) {
        setError("");
        router.push("/doctors");
      }
    } catch (error) {
      console.error("An unexpected error happened:", error);
      setError("An unexpected error happened");
    }
  };
  if (sessionStatus === "loading") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-between p-24 text-900 font-bold">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24 mt-24">
      <div className="bg-100 p-8 rounded shadow-md w-96 border border-600">
        <h1 className="text-600 text-4xl text-center font-bold mb-8">
          Agregar Doctor
        </h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="w-full border border-600 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-900 focus:text-black"
            placeholder="Número de Licencia"
            required
          />
          <input
            type="text"
            className="w-full border border-600 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-900 focus:text-black"
            placeholder="Nombre"
            required
          />
          <input
            type="text"
            className="w-full border border-600 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-900 focus:text-black"
            placeholder="Especialidad"
            required
          />
          <input
            type="text"
            className="w-full border border-600 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-900 focus:text-black"
            placeholder="Teléfono"
            required
          />
          <input
            type="text"
            className="w-full border border-600 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-900 focus:text-black"
            placeholder="Clínica"
            required
          />
          <input
            type="text"
            className="w-full border border-600 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-900 focus:text-black"
            placeholder="Hospital"
            required
          />

          <button
            type="submit"
            className="w-full text-xl font-semibold bg-600 text-50 py-2 rounded-2xl hover:bg-700 cursor-pointer"
          >
            {" "}
            Registrar
          </button>
          <p className="text-red-600 text-[16px] mb-4">{error && error}</p>
        </form>
      </div>
    </div>
  );
}

export default RegisterDoctor;
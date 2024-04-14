"use client";
import { useEffect, useState } from "react";
import React from 'react'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function Appointments() {
  const router = useRouter();
  const [error, setError] = useState("");
  const { data: session, status: sessionStatus } = useSession();
  useEffect(() => {
    if (sessionStatus === "unauthenticated") {
      router.replace("/inicio");
    }
  }, [sessionStatus, router]);

  const isValidFechaHora = (fechaHora: string) => {
    const fechaHoraRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;;
    return fechaHoraRegex.test(fechaHora);
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const fechaHora = e.target[0].value;
    const duracionEstimada = e.target[1].value;
    const tipo = e.target[2].value;
    const medicoAsignado = e.target[3].value;
    const motivo = e.target[4].value;

    if (!isValidFechaHora(fechaHora)) {
      setError("FechaHora is invalid");
      return;
    }

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fechaHora,
          duracionEstimada,
          tipo,
          medicoAsignado,
          motivo,
        }),
      });
      if (res.status === 400) {
        setError("This fechaHora is already registered");
        
      }
      if (res.status === 200) {
        setError("");
      }
    } catch (error) {
      console.error("An unexpected error happened:", error);
      setError("An unexpected error happened");
    }
  };
  if (sessionStatus === "loading") {
    return <div className="flex min-h-screen flex-col items-center justify-between p-24 text-900 font-bold"><h1>Cargando...</h1></div>;
  }

  return (
    sessionStatus === "authenticated" && (
      
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>Appointments</h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input type="text" placeholder="FechaHora" />
          <input type="text" placeholder="DuracionEstimada" />
          <input type="text" placeholder="Tipo" />
          <input type="text" placeholder="MedicoAsignado" />
          <input type="text" placeholder="Motivo" />
          <button type="submit">Submit</button>
        </form>
        <p>{error}</p>
      </div>
    )
    
  )
}

export default Appointments
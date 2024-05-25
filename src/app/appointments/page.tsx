"use client";
import { useEffect, useState } from "react";
import React from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function Appointments() {
  const router = useRouter();
  const [error, setError] = useState("");
  const { data: session, status: sessionStatus } = useSession();
  const [citas, setCitas] = useState(null);

  useEffect(() => {
    if (sessionStatus === "unauthenticated") {
      router.replace("/inicio");
    }
  }, [sessionStatus, router]);

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      fetch(`/api/appointments-doctor?email=${encodeURIComponent(session.user.email)}`)
        .then(response => response.json())
        .then(data => setCitas(data))
        .catch(error => {
          console.error('Error:', error);
          setError("Error fetching appointments");
        });
    }
  }, [sessionStatus, session]);

  if (sessionStatus === "loading") {
    return <div className="flex min-h-screen flex-col items-center justify-between p-24 text-900 font-bold"><h1>Cargando...</h1></div>;
  }

  const appointmentCount = citas ? citas.length : 0;

  return (
    sessionStatus === "authenticated" && (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center justify-center mt-32 w-4/5 sm:mt-16">
          <div className="container mx-auto">
            <div className="text-center">
              <h1 className="text-4xl font-semibold text-950">Hola, <span className="text-700">{session.user.name}</span>, tienes {appointmentCount} citas agendadas:</h1>
            </div>
            <div className="grid grid-cols-1 gap-4 p-2">
              <table className="border-collapse w-full">
                <thead>
                  <tr className="bg-purple-200">
                    <th className="border border-800 p-2">#</th>
                    <th className="border border-800 p-2">Correo del paciente</th>
                    <th className="border border-800 p-2">Nombre</th>
                    <th className="border border-800 p-2">Fecha de la cita</th>
                    <th className="border border-800 p-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {citas ? citas.map((cita, index) => (
                    <tr key={index} className="bg-100 hover:bg-200">
                      <td className="border border-800 p-2">{index + 1}</td>
                      <td className="border border-800 p-2">{cita.userEmail}</td>
                      <td className="border border-800 p-2">{cita.pacientName}</td>
                      <td className="border border-800 p-2">{new Date(cita.appointmentDate).toLocaleString()}</td>
                      <td className="border border-800 p-2">
                        <button className="bg-200 border border-800 p-2 rounded-lg hover:bg-300 hover:text-800 mr-2" onClick={() => handleCreatePrescription(cita)}>Create Prescription</button>
                        <button className="bg-200 border border-800 p-2 rounded-lg hover:bg-300 hover:text-800 mr-2" onClick={() => handleAddEntry(cita)}>Add Entry to Record</button>
                        <button className="bg-200 border border-800 p-2 rounded-lg hover:bg-300 hover:text-800 mr-2" onClick={() => handleFinishAppointment(cita)}>Finish Appointment</button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={5} className="border border-800 p-2 text-center">No appointments found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

function handleCreatePrescription(cita) {
  // Add logic to handle creating a prescription
  console.log("Creating prescription for:", cita);
}

function handleAddEntry(cita) {
  // Add logic to handle adding an entry to the patient's record
  console.log("Adding entry to record for:", cita);
}

function handleFinishAppointment(cita) {
  // Add logic to handle finishing the appointment
  console.log("Finishing appointment for:", cita);
}

export default Appointments;

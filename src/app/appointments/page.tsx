"use client";
import { useEffect, useState } from "react";
import React from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import PendingAppointments from "../../components/pendingAppointments";
import CompletedAppointments from "../../components/completedAppointments";

export default function Appointments() {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  const [activeComponent, setActiveComponent] = useState('pending');

  useEffect(() => {
    if (sessionStatus === "unauthenticated") {
      router.replace("/inicio");
    }
  }, [sessionStatus, router]);

  if (sessionStatus === "loading") {
    return <div className="flex min-h-screen flex-col items-center justify-between p-24 text-900 font-bold"><h1>Cargando...</h1></div>;
  }

  const renderComponent = () => {
    switch (activeComponent) {
      case 'pending':
        return <PendingAppointments />;
      case 'completed':
        return <CompletedAppointments />;
      default:
        return <PendingAppointments />;
    }
  }

  return (
    <div className="flex h-[85vh] mt-20 p-4 gap-4">
      <div className="w-1/4 p-4 border-r-2 bg-100 text-800 border border-600 rounded-xl overflow-auto">
        <h1 className="text-2xl font-bold text-center text-700 p-2 mb-2">Panel de administrador</h1>
        <button onClick={() => setActiveComponent('pending')} className="w-full text-xl mb-2 p-2 text-800 font-bold cursor-pointer hover:bg-400 hover:text-100 bg-200 border border-900 rounded-lg">Citas Pendientes</button>
        <button onClick={() => setActiveComponent('completed')} className="w-full text-xl mb-2 p-2 text-800 font-bold cursor-pointer hover:bg-400 hover:text-100 bg-200 border border-900 rounded-lg">Citas Finalizadas</button>
      </div>
      <div className="w-3/4 overflow-auto bg-100 border border-600 rounded-xl">
        {renderComponent()}
      </div>
    </div>
  );
}

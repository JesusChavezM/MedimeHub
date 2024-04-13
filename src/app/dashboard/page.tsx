import React from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import cita from "../../assets/img_cita.svg";
import doctor from "../../assets/img_doctor.svg";
import expediente from "../../assets/img_expediente.svg";
import hospital from "../../assets/img_hospital.svg";
import receta from "../../assets/img_receta.svg";
import Maps from "../../components/Maps";

const Dashboard = async () => {
  const session = await getServerSession();
  if (!session) {
    redirect("/");
  }
  return (
    <div className="py-4 md:py-8 flex flex-col md:flex-row items-center justify-center min-h-screen mx-auto">
      <div className="flex flex-col space-y-4 items-start md:items-start text-left mt-32 w-5/6 md:w-auto">
        <div className="w-full md:w-auto text-950 text-2xl sm:text-3xl md:text-4xl font-bold font text-center md:mb-8 md:text-left md:self-start">
          Servicios
        </div>

        <Link
          href="/"
          className="flex flex-row items-center space-x-4 w-full rounded-lg bg-200 border border-600 hover:bg-300"
        >
          <Image src={cita} width={48} height={48} alt="citas" />
          <div className="flex-grow">
            <span className="text-950 text-lg sm:text-2xl md:text-3xl mr-2 font-semibold">
              Hacer citas médicas
            </span>
          </div>
        </Link>

        <Link
          href="/"
          className="flex flex-row items-center space-x-4 w-full rounded-lg bg-200 border border-600 hover:bg-300"
        >
          <Image src={receta} width={48} height={48} alt="recetas" />
          <div className="flex-grow">
            <span className="text-950 text-lg sm:text-2xl md:text-3xl mr-2 font-semibold">
              Consultar recetas médicas
            </span>
          </div>
        </Link>
        <Link
          href="/"
          className="flex flex-row items-center space-x-4 w-full rounded-lg bg-200 border border-600 hover:bg-300"
        >
          <Image src={doctor} width={48} height={48} alt="doctores" />
          <div className="flex-grow">
            <span className="text-950 text-lg sm:text-2xl md:text-3xl mr-2 font-semibold">
              Consultar doctores
            </span>
          </div>
        </Link>
        <Link
          href="/"
          className="flex flex-row items-center space-x-4 w-full rounded-lg bg-200 border border-600 hover:bg-300"
        >
          <Image src={expediente} width={48} height={48} alt="expediente" />
          <div className="flex-grow">
            <span className="text-950 text-lg sm:text-2xl md:text-3xl mr-2 font-semibold">
              Consultar expediente médico
            </span>
          </div>
        </Link>
      </div>
      <div className="flex flex-col space-y-4 items-start md:items-start text-left w-5/6 md:w-auto">
      <div className="w-full mt-6 md:w-auto text-950 text-2xl sm:text-3xl md:text-4xl font-bold font text-center md:mb-8 md:text-left md:self-start">
          Consultar Hospitales
        </div>
        <div >
          <Maps />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

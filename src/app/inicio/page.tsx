import React from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import cita from "../../assets/img_cita.svg";
import doctor from "../../assets/img_doctor.svg";
import expediente from "../../assets/img_expediente.svg";
import receta from "../../assets/img_receta.svg";
import Maps from "../../components/Maps";

const Inicio = async () => {
  const session = await getServerSession();
  if (!session) {
    redirect("/");
  }
  return (
    <div className="py-4 md:py-8 flex flex-col md:flex-row items-center justify-center">
      <div className="flex-col space-y-4 md:mr-8 text-left mt-32 md:mt-0 w-5/6 md:w-auto">
        <div className="w-full md:mr-8 md:w-auto text-950 text-3xl sm:text-2xl md:text-3xl font-semibold font text-center md:mb-8 md:text-left md:self-start">
          Servicios
        </div>
        <Link
          href="/prescriptions"
          className="flex flex-row items-center space-x-4 w-full rounded-lg bg-200 border border-600 hover:bg-300"
        >
          <Image src={receta} width={48} height={48} alt="recetas" />
          <div className="flex-grow">
            <span className="text-950 text-lg  md:text-2xl mr-2 font-semibold">
              Consultar recetas médicas
            </span>
          </div>
        </Link>
        <Link
          href="/doctors"
          className="flex flex-row items-center space-x-4 w-full rounded-lg bg-200 border border-600 hover:bg-300"
        >
          <Image src={doctor} width={48} height={48} alt="doctores" />
          <div className="flex-grow">
            <span className="text-950 text-lg  md:text-2xl mr-2 font-semibold">
              Consultar doctores y Agendar
            </span>
          </div>
        </Link>
        <Link
          href="/"
          className="flex flex-row items-center space-x-4 w-full rounded-lg bg-200 border border-600 hover:bg-300"
        >
          <Image src={expediente} width={48} height={48} alt="expediente" />
          <div className="flex-grow">
            <span className="text-950 text-lg  md:text-2xl mr-2 font-semibold">
              Consultar expediente médico
            </span>
          </div>
        </Link>
      </div>
      <div className="flex flex-col md:mt-12 mt-4 md:items-start text-center w-5/6 md:w-auto">
        <div className="w-full md:w-auto mx-auto  text-950 text-2xl sm:text-xl md:text-3xl font-semibold font text-center md:mb-0 md:text-left md:self-start">
          Hospitales
        </div>
        <div>
          <Maps />
        </div>
      </div>
    </div>
  );
};

export default Inicio;

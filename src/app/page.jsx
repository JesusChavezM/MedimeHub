import Image from "next/image";
import Link from "next/link";
import cita from "../assets/img_cita.svg";
import doctor from "../assets/img_doctor.svg";
import expediente from "../assets/img_expediente.svg";
import hospital from "../assets/img_hospital.svg";
import receta from "../assets/img_receta.svg";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen my-4">
      <div className="flex flex-col justify-center items-center flex-grow min-h-50vh md:min-h-90vh">
        <div className="text-center">
          <span className="text-violet-950 text-4xl sm:text-6xl lg:text-8xl font-semibold">
            We Care About
          </span>
          <span className="text-violet-600 text-4xl sm:text-6xl lg:text-8xl font-semibold">
            {" "}
            You
          </span>
        </div>
        <div className="text-violet-700 text-sm sm:text-lg font-semibold text-center mb-2 px-4 sm:px-8">
          Porque tu salud importa: Medimehub pone el control en tus manos, donde
          quiera que estés.
        </div>
        <Link href="/register">
          <div className="bg-600 rounded-full my-4 justify-center items-center inline-flex h-11 sm:my-0 hover:bg-300  hover:text-900 text-50 text-xl sm:text-2xl font-bold">
            <span className="cursor-pointer mx-6">¡Registrate para comenzar </span>
          </div>
        </Link>
      </div>
      <div className="py-4 md:py-8 flex flex-col md:flex-row items-center justify-center min-h-screen mx-auto">
        <div className="flex flex-col space-y-8 items-start md:items-start text-left w-3/4 md:w-auto">
          <div className="w-full md:w-auto text-950 text-2xl sm:text-3xl md:text-4xl font-bold font text-center md:mb-8 md:text-left md:self-start">
            Nuestros servicios
          </div>
          <div className="flex flex-row items-center space-x-4">
            <Image src={hospital} width={48} height={48} alt="hospital" />
            <span className="text-950 text-lg sm:text-2xl md:text-3xl font-semibold">
              Consultar hospitales
            </span>
          </div>
          <div className="flex flex-row items-center space-x-4">
            <Image src={cita} width={48} height={48} alt="citas" />
            <span className="text-950 text-lg sm:text-2xl md:text-3xl font-semibold">
              Hacer citas médicas
            </span>
          </div>
          <div className="flex flex-row items-center space-x-4">
            <Image src={receta} width={48} height={48} alt="recetas" />
            <span className="text-950 text-lg sm:text-2xl md:text-3xl font-semibold">
              Consultar recetas médicas
            </span>
          </div>
          <div className="flex flex-row items-center space-x-4">
            <Image src={doctor} width={48} height={48} alt="doctores" />
            <span className="text-950 text-lg sm:text-2xl md:text-3xl font-semibold">
              Consultar doctores
            </span>
          </div>
          <div className="flex flex-row items-center space-x-4">
            <Image src={expediente} width={48} height={48} alt="expediente" />
            <span className="text-950 text-lg sm:text-2xl md:text-3xl font-semibold">
              Consultar expediente médico
            </span>
          </div>
        </div>
        <div className="mt-8 md:mt-0 md:ml-44">
          <Image
            src="/static/media/landing_img.png"
            width={657}
            height={536}
            alt="Landing-services"
          />
        </div>
      </div>
    </div>
  );
}

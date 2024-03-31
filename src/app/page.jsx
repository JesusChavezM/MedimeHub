import Navbar from "../components/Navbar";
import Image from "next/image";
import cita from "../assets/img_cita.svg";
import doctor from "../assets/img_doctor.svg";
import expediente from "../assets/img_expediente.svg";
import hospital from "../assets/img_hospital.svg";
import receta from "../assets/img_receta.svg";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen my-4">
      <Navbar />
      <div className="flex flex-col justify-center items-center flex-grow min-h-40vh md:min-h-90vh">
        <div className="text-center">
          <span className="text-violet-950 text-4xl sm:text-6xl lg:text-8xl font-semibold">We Care About</span>
          <span className="text-violet-600 text-4xl sm:text-6xl lg:text-8xl font-semibold"> You</span>
        </div>
        <div className="text-violet-700 text-sm sm:text-lg font-semibold text-center mb-2 px-4 sm:px-8">Porque tu salud importa: Medimehub pone el control en tus manos, donde quiera que estés.</div>
      </div>
      <div className="py-4 flex flex-col md:flex-row items-center justify-center min-h-screen mx-auto">
        <div className="text-950 text-2xl sm:text-3xl md:text-4xl font-bold font text-center mb-4">Nuestros servicios</div>
        <div className="grid grid-cols-2 gap-4 items-center">
          <div className="flex flex-row items-center space-x-4 justify-center">
            <Image src={hospital} width={32} height={32} alt="hospital" />
            <span className="text-950 text-sm sm:text-xl font-semibold">Consultar hospitales</span>
          </div>
          <div className="flex flex-row items-center space-x-4 justify-center">
            <Image src={cita} width={32} height={32} alt="citas"/>
            <span className="text-950 text-sm sm:text-xl font-semibold">Hacer citas médicas</span>
          </div>
          <div className="flex flex-row items-center space-x-4 justify-center">
            <Image src={receta} width={32} height={32} alt="recetas"/>
            <span className="text-950 text-sm sm:text-xl font-semibold">Consultar recetas médicas</span>
          </div>
          <div className="flex flex-row items-center space-x-4 justify-center">
            <Image src={doctor} width={32} height={32} alt="doctores"/>
            <span className="text-950 text-sm sm:text-xl font-semibold">Consultar doctores</span>
          </div>
          <div className="flex flex-row items-center space-x-4 justify-center">
            <Image src={expediente} width={32} height={32} alt="expediente"/>
            <span className="text-950 text-sm sm:text-xl font-semibold">Consultar expediente médico</span>
          </div>
        </div>
        <div className="mt-8 md:mt-0 md:ml-44">
          <Image src="/static/media/landing_img.png" width={657} height={536} alt="Landing-services" />
        </div>
      </div>
    </div>
  );
}

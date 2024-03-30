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
      <div className="flex flex-col justify-center items-center flex-grow min-h-90vh">
        <div className="text-center">
          <span className="text-violet-950 text-6xl sm:text-7xl lg:text-8xl font-semibold">We Care About</span>
          <span className="text-violet-600 text-6xl sm:text-7xl lg:text-8xl font-semibold"> You</span>
        </div>
        <div className="text-violet-700 text-lg sm:text-xl font-semibold text-center mb-4 px-4 sm:px-8">Porque tu salud importa: Medimehub pone el control en tus manos, donde quiera que estés.</div>
      </div>
      <div className="py-8 flex flex-row items-center justify-center min-h-screen">
        <div className="flex flex-col space-y-8">
          <div className="text-950 text-4xl font-bold font">Nuestros servicios</div>
          <div className="flex items-center space-x-4">
            <Image src={hospital} width={48} height={48} />
            <span className="text-950 text-2xl font-semibold">Consultar hospitales</span>
          </div>
          <div className="flex items-center space-x-4">
            <Image src={cita} width={48} height={48} />
            <span className="text-950 text-2xl font-semibold">Hacer citas médicas</span>
          </div>
          <div className="flex items-center space-x-4">
            <Image src={receta} width={48} height={48} />
            <span className="text-950 text-2xl font-semibold">Consultar recetas médicas</span>
          </div>
          <div className="flex items-center space-x-4">
            <Image src={doctor} width={48} height={48} />
            <span className="text-950 text-2xl font-semibold">Consultar doctores</span>
          </div>
          <div className="flex items-center space-x-4">
            <Image src={expediente} width={48} height={48} />
            <span className="text-950 text-2xl font-semibold">Consultar expediente médico</span>
          </div>
        </div>
        <div className="ml-44">
          <Image src="/static/media/landing_img.png" width={657} height={536} />
        </div>
      </div>

    </div>
  );
}

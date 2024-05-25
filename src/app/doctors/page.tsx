"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import ImgDoctor from "../../assets/img_doctor.svg";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Calendar from "../../components/calendar";
import Imgid from "../../assets/img_id.svg";
import ImgPhone from "../../assets/img_phone.svg";
import ImgLocation from "../../assets/img_location.svg";
import ImgRoom from "../../assets/img_room.svg";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectesDoctor, setSelectedDoctor] = useState(null);
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/doctors");
    }
  }, [sessionStatus, router]);

  useEffect(() => {
    const getDoctors = async () => {
      const response = await fetch("/api/doctors", { cache: "no-cache" });
      const data = await response.json();
      setDoctors(data);
    };
    getDoctors();
  }, []);

  if (sessionStatus === "loading") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-between p-24 text-900 font-bold">
        <h1>Cargando ...</h1>
      </div>
    );
  }


  return (
    sessionStatus === "authenticated" && (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center justify-center mt-32 w-4/5 sm:mt-16">
          <div className="container mx-auto">
            <div className="text-center">
              <h1 className="text-4xl font-semibold text-950">Nuestro Equipo de <span className="text-700"> Doctores </span></h1>
              <p className="text-xl text-950 mt-4 text-pretty">
                Te presentamos a nuestro dedicado y experimentado equipo de doctores. Cada uno de ellos está comprometido a proporcionar la mejor atención médica posible. Puedes conocer más sobre cada uno de ellos a continuación y, si lo deseas, puedes agendar una cita directamente desde aquí. ¡Estamos aquí para cuidar de tu salud!
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 p-2">
              {doctors.map((doctor) => (
                <div
                  key={doctor._id}
                  className="bg-100 rounded-lg border border-600 shadow-md"
                >
                  <div className="p-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <div className="flex items-center">
                        <img
                          src="https://cdn.discordapp.com/attachments/817616928947699722/1235090438029840424/image.png?ex=66331b1b&is=6631c99b&hm=0bcbecccf95deeaaeda0b11c82d430394b68e6c5a3b6442961f988b79d6503d9&"
                          height={100}
                          width={100}
                          className="rounded-3xl border border-950"
                          alt="doctor"
                        />
                        <div className="mt-2 ml-8 w-full">
                          <span className="text-900 font-semibold">Nombre:</span>
                          <div className="p-2 text-center flex  bg-white rounded-lg border border-800">
                            <span className="text-black px-3 py-1 text-xl font-medium">
                              {doctor.name}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-2">
                        <span className="text-900 font-semibold">Especialidades:</span>
                        <div className="p-2 text-center flex overflow-x-auto bg-white rounded-lg border border-800">
                          {Array.isArray(doctor.speciality)
                            ? doctor.speciality.map((speciality, index) => (
                              <span key={index} className="bg-700 rounded-full text-white px-3 mr-2 py-1 text-xs uppercase font-medium">
                                {speciality}
                              </span>
                            ))
                            : <span className="bg-700 rounded-full text-white px-3 py-1 text-xs uppercase font-medium">
                              {doctor.speciality}
                            </span>
                          }
                        </div>
                      </div>
                      <div className='rounded-lg'>
                        <div className="flex flex-col items-center justify-center text-900 font-semibold">
                          <div className="p-1 flex flex-col items-start mt-2 bg-white rounded-lg border border-800 w-full">
                            <div className='flex items-center border-b border-gray-300 pb-2 w-full'>
                              <Image src={Imgid} height={48} width={48} alt={doctor.id} className="mr-2" />
                              Cédula: <span className='ml-4 font-bold text-black'>{doctor.license}</span>
                            </div>
                            <div className="flex items-center border-b border-gray-300 pb-2 pt-2 w-full">
                              <Image src={ImgPhone} height={48} width={48} alt={doctor.id} className="mr-2" />
                              Telefono: <span className='ml-4 font-bold text-black'>{doctor.phone}</span>
                            </div>
                            <div className='flex items-center border-b border-gray-300 pb-2 pt-2 w-full'>
                              <Image src={ImgRoom} height={48} width={48} alt={doctor.id} className="mr-2" />
                              Consultorio: <span className='ml-4 font-bold text-black'>{doctor.clinic}</span>
                            </div>
                            <div className='flex items-center pb-2 pt-2 w-full'>
                              <Image src={ImgLocation} height={48} width={48} alt={doctor.id} className="mr-2" />
                              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(doctor.hospital)}`} target="_blank" rel="noopener noreferrer" className='font-bold text-black underline underline-offset-1 hover:text-600'>
                                {doctor.hospital}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Calendar onDateTimeSelect={(dateTime) => {
                        const isoString = dateTime.toISOString();
                        fetch('/api/appointments', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({
                            doctorName: doctor.name,
                            doctorEmail: doctor.email,
                            pacientName: session.user.name,
                            userEmail: session.user.email,
                            speciality: doctor.speciality,
                            appointmentDate: isoString,
                          }),
                        })
                          .then(response => response.json())
                          .then(data => console.log(data))
                          .catch((error) => {
                            console.error('Error:', error);
                          });
                      }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Doctors;

"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import ImgDoctor from "../../assets/img_doctor.svg";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
      <div className="flex flex-col items-center mt-28">
        <div className="container mx-auto">
          <div className="text-center mt-8">
            <h1 className="text-3xl font-semibold text-950">Doctores</h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2  gap-4 mt-2 p-4">
            {doctors.map((doctor) => (
              <div
                key={doctor._id}
                className="bg-100 rounded-lg border border-600 shadow-md"
              >
                <div className="p-4 grid grid-cols-1 sm:grid-cols-2">
                  {/* Columna Izquierda */}
                  <div>
                    <div className="flex items-center">
                      <Image
                        src={doctor.image || ImgDoctor}
                        height={100} // Reducir el tamaño de la imagen
                        width={100} // Reducir el tamaño de la imagen
                        className="rounded-tl-3xl border border-950"
                        alt="doctor"
                      />

                      <h2 className="text-lg font-bold text-950 px-8">
                        {doctor.name}
                      </h2>

                    </div>
                    <div className="mt-2 text-center flex flex-wrap">
                      {Array.isArray(doctor.speciality)
                        ? doctor.speciality.map((speciality, index) => (
                          <span key={index} className="bg-700 rounded-full text-white px-3 mr-2 mb-2 py-1 text-xs uppercase font-medium">
                            {speciality}
                          </span>
                        ))
                        : <span className="bg-700 rounded-full text-white px-3 py-1 text-xs uppercase font-medium">
                          {doctor.speciality}
                        </span>
                      }
                    </div>
                    <div className="mt-2 p-4">
                      <div className="flex gap-4 items-center">
                        <Image
                          src={Imgid}
                          height={48}
                          width={48}
                          alt={doctor.id}
                        />
                        <div className="flex justify-between flex-1">
                          <span className="text-950 font-semibold">Cédula:</span>
                          <span className="text-700">{doctor.license}</span>
                        </div>
                      </div>
                      <div className="flex gap-4 items-center">
                        <Image
                          src={ImgPhone}
                          height={48}
                          width={48}
                          alt={doctor.id}
                        />
                        <div className="flex justify-between flex-1">
                          <span className="text-950 font-semibold">Telefono:</span>
                          <span className="text-700">{doctor.phone}</span>
                        </div>
                      </div>
                      <div className="flex gap-4 items-center">
                        <Image
                          src={ImgRoom}
                          height={48}
                          width={48}
                          alt={doctor.id}
                        />
                        <div className="flex justify-between flex-1">
                          <span className="text-950 font-semibold">Consultorio:</span>
                          <span className="text-700">{doctor.clinic}</span>
                        </div>
                      </div>
                      <div className="flex gap-4 items-center">
                        <Image
                          src={ImgLocation}
                          height={48}
                          width={48}
                          alt={doctor.id}
                        />
                        <div className="flex justify-center flex-1">
                          {/* <span className="text-950 font-semibold">Hospital:</span> */}
                          <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(doctor.hospital)}`} target="_blank" rel="noopener noreferrer" className="text-900 text-lg overflow-hidden overflow-ellipsis whitespace-nowrap max-w-auto hover:underline hover:text-700">
                            {doctor.hospital}
                          </a>
                        </div>
                      </div>




                      {/* <p className="text-900 font-semibold">
                          Consultario:{" "}
                        </p> */}
                    </div>
                  </div>

                  {/* Columna Derecha */}
                  <div>
                    <Calendar onDateTimeSelect={(dateTime) => console.log(dateTime)} />
                  </div>
                </div>
              </div>

            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Doctors;

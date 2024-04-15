"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import ImgDoctor from "../../assets/img_doctor.svg";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
      <div className="flex flex-col items-center mt-20">
        <div className="container mx-auto">
    <div className="text-center mt-8">
      <h1 className="text-3xl font-semibold text-950">Doctores</h1>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-8 ">
      {doctors.map((doctor) => (
        <div
          key={doctor._id}
          className="bg-100 rounded-lg border border-600 shadow-md"
        >
          <div className="p-4">
            <div className="flex items-center justify-center">
              <Image
                src={doctor.image || ImgDoctor}
                height={50} // Reducir el tamaño de la imagen
                width={50} // Reducir el tamaño de la imagen
                className="rounded-full"
                alt="doctor"
              />
            </div>
            <div className="mt-2 text-center">
              <h2 className="text-lg font-bold text-950 truncate overflow-hidden">
                {doctor.name}
              </h2>
            </div>
            <div className="mt-2">
              <p className="text-900 font-semibold">
                Especialidad:{" "}
                <span className="text-700">{doctor.speciality}</span>
              </p>
              <p className="text-900 font-semibold">
                Licencia:{" "}
                <span className="text-700">{doctor.license}</span>
              </p>
              <p className="text-900 font-semibold">
                Telefono: <span className="text-700">{doctor.phone}</span>
              </p>
              <p className="text-900 font-semibold">
                Consultario:{" "}
                <span className="text-700">{doctor.clinic}</span>
              </p>
              <p className="text-900 font-semibold">
                Hospital:{" "}
                <span className="text-700">{doctor.hospital}</span>
              </p>
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

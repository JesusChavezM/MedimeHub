"use client";
import React, {useEffect, useState} from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import ImgView from "../assets/img_view.svg"
import Link from "next/link";

function ViewPrescriptionsDoctor() {
    const {data: session, status: sessionStatus} = useSession();
    const [prescriptions, setPrescriptions] = useState([]);
    
    useEffect(() => {
        if(sessionStatus === "authenticated" && session.user.role === "doctor"){
            fetch(`/api/prescriptions/view/doctor?email=${session?.user.email}`) 
            .then((res) => res.json())
            .then(data => setPrescriptions(data))
            .catch(error => console.error("Error:", error));
        }
    }, [sessionStatus, session]);

    if (sessionStatus === "loading") {
        return <div className="flex min-h-screen flex-col items-center justify-between p-24 text-900 font-bold"><h1>Loading...</h1></div>;
    }

    console.log(prescriptions);


    return (
        sessionStatus === "authenticated" && (
            <div className="flex items-center justify-center min-h-screen">
                <div className="flex flex-col items-center justify-center mt-32 w-4/5 sm:mt-16">
                    <div className="container mx-auto">
                        <div className="grid grid-cols-1 gap-4 p-2">
                            <table className="border-collapse w-full">
                                <thead>
                                    <tr className="bg-purple-200">
                                        <th className="border border-800 p-2">Fecha</th>
                                        <th className="border border-800 p-2">Doctor</th>
                                        <th className="border border-800 p-2">Especialidad</th>
                                        <th className="border border-800 p-2">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {prescriptions.map((prescription) => (
                                        <tr key={prescription._id} className="bg-100">
                                            <td className="border border-800 p-2">{new Date(prescription.date).toLocaleDateString()}</td>
                                            <td className="border border-800 p-2">{prescription.doctor.name}</td>
                                            <td className="border border-800 p-2">{prescription.doctor.speciality.join(", ")}</td>
                                            <td className="border border-800 p-2">
                                                <Link href={`/viewPrescription?id=${encodeURIComponent(prescription._id)}`} passHref>
                                                    <div className="bg-200 border border-800 p-2 rounded-lg hover:bg-300 hover:text-800">
                                                        <Image src={ImgView} width={24} height={24} alt={prescription._id} />
                                                    </div>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}

export default ViewPrescriptionsDoctor;
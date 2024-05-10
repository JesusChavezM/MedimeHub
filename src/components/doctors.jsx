"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ImgDoctor from "../assets/img_doctor.svg";
import ImgEdit from "../assets/img_edit.svg";
import ImgDelete from "../assets/img_delete.svg";

export default function UsersPage() {
    const [selectedUser, setSelectedUser] = useState(null);
    const [expandedOptions, setExpandedOptions] = useState({});

    const [doctors, setDoctors] = useState([]);


    useEffect(() => {
        const getDoctors = async () => {
            const response = await fetch("/api/doctors", { cache: "no-store" });
            const data = await response.json();
            setDoctors(data);
        };

        getDoctors();
    }, []);

    const deleteDoctor = async (id) => {
        const response = await fetch(`/api/doctors?id=${id}`, { method: "DELETE" });
        const data = await response.json();

        if (data.error) {
            console.error(data.error);
        } else {
            setUsers(users.filter((user) => user._id !== id));
        }
    };

    return (
        <div className="flex flex-col items-center justify-between p-6">
            <div className="flex items-center justify-center mb-4 w-full">
                <h1 className="text-2xl font-bold xl:mt-0 md:mt-0">
                    Lista de Doctores
                </h1>
                <Link
                    className="text-xl p-1 text-600 font-bold  xl:mt-0 md:mt-0 cursor-pointer hover:bg-400 hover:text-100 bg-200 border border-900 rounded-lg fill-current ml-auto shrink-0"
                    href="/RegisterDoctor"
                >
                    Agregar doctor
                </Link>
            </div>
            <div className="w-full">
                <div className="hidden sm:block">
                    <table className="w-full border-collapse border border-800">
                        <thead>
                            <tr className="bg-purple-200">
                                <th className="border border-800">Foto</th>
                                <th className="border border-800 p-2">ID</th>
                                <th className="border border-800 p-2">License</th>
                                <th className="border border-800 p-2">Nombre</th>
                                <th className="border border-800 p-2">Especialidad</th>
                                <th className="border border-800 p-2">Telefono</th>
                                <th className="border border-800 p-2">Consultorio</th>
                                <th className="border border-800 p-2">Hospital</th>
                                <th className="border border-800 p-2">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {doctors.map((doctor) => (
                                <tr key={doctor._id} className="bg-100">
                                    <td className="border border-800 p-px">
                                        <div className="flex items-center justify-center">
                                            <img
                                                src={doctor.image || ImgDoctor}
                                                className="w-10 h-10 rounded-full"
                                            />
                                        </div>
                                    </td>
                                    <td className="border border-800 p-2">{doctor._id}</td>
                                    <td className="border border-800 p-2 hidden md:table-cell">
                                        {doctor.license}
                                    </td>
                                    <td className="border border-800 p-2 hidden md:table-cell">
                                        {doctor.name}
                                    </td>
                                    <td className="border border-800 p-2 hidden md:table-cell">
                                        {Array.isArray(doctor.speciality) ? doctor.speciality.join(', ') : doctor.speciality}
                                    </td>

                                    <td className="border border-800 p-2 hidden md:table-cell">
                                        {doctor.phone}
                                    </td>
                                    <td className="border border-800 p-2 hidden md:table-cell">
                                        {doctor.clinic}
                                    </td>
                                    <td className="border border-800 p-2 hidden md:table-cell">
                                        {doctor.hospital}
                                    </td>
                                    <td className="border border-800 p-2 space-x-2">
                                        <button onClick={() => {
                                            deleteDoctor(doctor._id);
                                            window.location.reload();
                                        }}>
                                            <Image
                                                src={ImgDelete}
                                                height={20}
                                                width={20}
                                                alt="delete-button"
                                            />
                                        </button>
                                        <button onClick={() => editDoctor(doctor._id)}>
                                            <Image
                                                src={ImgEdit}
                                                height={20}
                                                width={20}
                                                alt="delete-button"
                                            />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="">
                    <div className="sm:hidden">
                        <div className="grid grid-cols-1 gap-3  w-[380px]">
                            {doctors.map((doctor) => (
                                <div
                                    key={doctor._id}
                                    className="bg-purple-200 border border-purple-800 rounded-lg shadow-md p-4 m-1 "
                                >
                                    <div className="flex items-center mb-2">
                                        <img
                                            src={ImgDoctor}
                                            alt={doctor.name}
                                            className="w-10 h-10 rounded-full mr-4"
                                        />
                                        <div>
                                            <p className="font-bold text-lg">{doctor.name}</p>
                                            <p className="text-gray-500 truncate">Id: {doctor._id}</p>
                                            <p className="text-gray-500 truncate">
                                                Cedula:{doctor.license}
                                            </p>
                                            <div className="text-gray-500">
                                                Especialidad:
                                                {Array.isArray(doctor.speciality)
                                                    ? doctor.speciality.map((speciality, index) => (
                                                        <div key={index} className="ml-4">
                                                            {speciality}
                                                        </div>
                                                    ))
                                                    : doctor.speciality
                                                }
                                            </div>


                                            <p className="text-gray-500 truncate">
                                                Telefono: {doctor.phone}
                                            </p>
                                            <p className="text-gray-500 truncate">
                                                Consultorio: {doctor.clinic}
                                            </p>
                                            <p className="text-gray-500 truncate">
                                                Hospital: {doctor.hospital}
                                            </p>
                                            <p className="flex gap-2">
                                                {" "}
                                                Acciones:
                                                <button onClick={() => deleteDoctor(doctor._id)}>
                                                    <Image
                                                        src={ImgDelete}
                                                        height={20}
                                                        width={20}
                                                        alt="delete-button"
                                                    />
                                                </button>
                                                <button onClick={() => editDoctor(doctor._id)}>
                                                    <Image
                                                        src={ImgEdit}
                                                        height={20}
                                                        width={20}
                                                        alt="delete-button"
                                                    />
                                                </button>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

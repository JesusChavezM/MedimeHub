"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ImgDelete from "../assets/img_delete.svg";

export default function LocationsPage() {

    const [locations, setLocations] = useState([]);
    
    useEffect(() => {
        const getLocations = async () => {
            const response = await fetch("/api/locations", { cache: "no-store" });
            const data = await response.json();
            setLocations(data);
        }
        getLocations();
    }, []);

    const deleteLocation = async (id) => {
        const response = await fetch(`/api/locations?id=${id}`, { method: "DELETE" });
        const data = await response.json();

        if (data.error) {
            console.error(data.error);
        } else {
            setLocations(locations.filter((location) => location._id !== id));
        }
    }

    return (
        <div className="flex flex-col items-center justify-between p-6">
            <div className="flex items-center justify-center mb-4 w-full">
                <h1 className="text-2xl font-bold xl:mt-0 md:mt-0">
                    Lugares Agregadas                </h1>
                <Link
                    className="text-xl p-1 text-600 font-bold  xl:mt-0 md:mt-0 cursor-pointer hover:bg-400 hover:text-100 bg-200 border border-900 rounded-lg fill-current ml-auto shrink-0"
                    href="/location-add"
                >
                    Agregar Lugares
                </Link>
            </div>

            <div className="w-full">
                <div className="hidden sm:block">
                    <table className="w-full border-collapse border border-800">
                        <thead>
                            <tr className="bg-purple-200">
                                <th className="border border-800">ID</th>
                                <th className="border border-800 p-2">Nombre</th>
                                <th className="border border-800 p-2">Latitud</th>
                                <th className="border border-800 p-2">Longitud</th>
                                <th className="border border-800 p-2">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {locations.map((location) => (
                                <tr key={location._id} className="bg-100">
                                    <td className="border border-800">{location._id}</td>
                                    <td className="border border-800 p-2">{location.name}</td>
                                    <td className="border border-800 p-2">{location.lat}</td> 
                                    <td className="border border-800 p-2">{location.lng}</td>                               
                                    <td className="border border-800 p-2">
                                        <button
                                            className="text-500 hover:text-700"
                                            onClick={() => deleteLocation(location._id)}
                                        >
                                            <Image
                                                src={ImgDelete}
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
                            {locations.map((faq) => (
                                <div key={locations._id} className="bg-200 p-4 rounded-lg">
                                    <div className="flex justify-between">
                                        <div className="text-500">{locations.name}</div>
                                        <div className="text-500">{locations.lat}</div>
                                        <div className="text-500">{locations.lng}</div>
                                        <div className="flex items-center">                                            
                                            <button
                                                className="text-500 hover:text-700"
                                                onClick={() => deleteFaq(locations._id)}
                                            >
                                                Eliminar
                                            </button>
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

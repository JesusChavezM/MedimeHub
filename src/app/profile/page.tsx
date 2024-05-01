"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import ImgUser from "../../assets/img_user.svg";
import ImgEdit from "../../assets/img_edit_profile.svg";
import ImgDelete from "../../assets/img_delete_profile.svg";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Profile = () => {
    const router = useRouter();
    const { data: session, status: sessionStatus } = useSession();
    const [citas, setCitas] = useState(null);
    const [user, setUser] = useState(null);

    const deleteCita = async (id) => {
        fetch(`/api/profile?id=${id}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setCitas(citas.filter(c => c._id !== id));
            })
            .catch(error => console.error('Error:', error));
    }

    useEffect(() => {
        if (sessionStatus === "authenticated") {
            fetch(`/api/user?email=${session.user.email}`)
                .then(response => response.json())
                .then(data => setUser(data))
                .catch(error => console.error('Error:', error));
        }
    }, [sessionStatus, session]);

    useEffect(() => {
        if (sessionStatus === "authenticated") {
            fetch(`/api/profile?email=${encodeURIComponent(session.user.email)}`)
                .then(response => response.json())
                .then(data => setCitas(data))
                .catch(error => console.error('Error:', error));
        }
    }, [sessionStatus, session]);

    if (sessionStatus === "loading") {
        return (
            <div className="flex min-h-screen flex-col items-center justify-between p-24 text-900 font-bold">
                <h1>Cargando ...</h1>
            </div>
        );
    }

    return (
        sessionStatus === "authenticated" && (
            <div className='flex flex-col mt-20 items-center justify-center'>
                <h1 className="font-semibold text-4xl text-900">Hola,<span className='text-600'> {session.user.name}</span> !</h1>
                <div className='flex mt-8 gap-6'>
                    {/* Perfil del usuario para editar */}
                    <div className='w-1/2 p-4 bg-100 border border-600 rounded-lg'>
                        <div className="flex flex-col items-center justify-center text-900 font-semibold">
                            <img
                                src={session.user.image || ImgUser}
                                alt={session.user.name}
                                width={120}
                                height={120}
                                className="rounded-3xl"
                            />
                            <div className="p-1 flex flex-col items-start bg-white rounded-lg border border-800 shadow-md w-80">
                                <div className='border-b border-gray-300 pb-2 w-full'>Nombre: <span className='font-bold text-black'>{user?.name}</span></div>
                                <div className="border-b border-gray-300 pb-2 pt-2 w-full">Email: <span className='font-bold text-black'>{user?.email}</span></div>
                                <div className='border-b border-gray-300 pb-2 pt-2 w-full'>Fecha de nacimiento: <span className='font-bold text-black'>{user?.birthdate}</span></div>
                                <div className='border-b border-gray-300 pb-2 pt-2 w-full'>Sexo: <span className='font-bold text-black'>{user?.gender}</span></div>
                                <div className='border-b border-gray-300 pb-2 pt-2 w-full'>Telefono: <span className='font-bold text-black'>{user?.phone}</span></div>
                                <div className='border-b border-gray-300 pb-2 pt-2 w-full'>Dirección: <span className='font-bold text-black'>{user?.address}</span></div>
                                <div className='border-b border-gray-300 pb-2 pt-2 w-full'>Estado: <span className='font-bold text-black'>{user?.state}</span></div>
                                <div className='border-b border-gray-300 pb-2 pt-2 w-full'>País: <span className='font-bold text-black'>{user?.country}</span></div>
                                <div className='pb-2 pt-2 w-full'>Código postal: <span className='font-bold text-black'>{user?.zipCode}</span></div>
                            </div>
                            <button className="flex text-xl p-1 text-600 font-bold mb-4 mt-24 xl:mt-8 md:mt-8 cursor-pointer hover:bg-200 hover:text-800 bg-50 border border-900 rounded-lg" onClick={() => router.push(`/edit-profile?email=${session.user.email}`)}>
                                <Image src={ImgEdit} alt="Edit Profile" width={30} height={30} />
                                Editar Perfil
                            </button>
                        </div>
                    </div>
                    {/* Sección de las citas del usuario */}
                    <div className="w-3/4 p-4 bg-100 border border-600 rounded-lg overflow-scroll max-w-3/4">
                        <div className='flex flex-col items-center justify-center text-900 font-semibold'>
                            <div className='flex flex-col items-center justify-center text-900 font-bold'>
                                <h1 className=''>Tienes <span className="text-red-600">{citas?.length || 0}</span> citas agenda(as).</h1>
                                {citas?.map((cita, index) => (
                                    <div key={index} className='bg-white p-4 m-2 rounded-lg w-full text-black border-b-2 border-gray-300'>
                                        <h2 className='font-bold'>Cita: <span className='text-red-600'>{index + 1}</span></h2>
                                        <p>Doctor: {cita.doctorName}</p>
                                        <p>Usuario: {cita.userEmail}</p>
                                        <p>Fecha de la cita: {new Date(cita.appointmentDate).toLocaleString()}</p>
                                        <button className='flex text-xl p-1 text-600 font-bold mb-4 mt-4 cursor-pointer hover:bg-200 hover:text-800 bg-50 border border-900 rounded-lg' onClick={() => deleteCita(cita._id)}>
                                            <Image src={ImgDelete} alt="Delete" width={30} height={30} />
                                            Eliminar
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>



                </div>

            </div>
        )
    );
};

export default Profile;

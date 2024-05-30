"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import ImgUser from "../../assets/img_user.svg";
import ImgEdit from "../../assets/img_edit_profile.svg";
import ImgDelete from "../../assets/img_delete_profile.svg";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import StarRaiting from "../../components/StarRating";


const Profile = () => {
    const router = useRouter();
    const { data: session, status: sessionStatus } = useSession();
    const [pendingCitas, setPendingCitas] = useState([]);
    const [completedCitas, setCompletedCitas] = useState([]);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [ratings, setRatings] = useState({});

    const deleteCita = async (id) => {
        fetch(`/api/profile?id=${id}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setPendingCitas(pendingCitas.filter(c => c._id !== id));
                setCompletedCitas(completedCitas.filter(c => c._id !== id));
            })
            .catch(error => console.error('Error:', error));
    };

    const handleRate = async (id, rating) => {
        try {
            const response = await fetch('/api/appointments', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, rating }),
            });

            if (response.ok) {
                const updatedCita = await response.json();
                setRatings({ ...ratings, [id]: rating });
            } else {
                console.error('Error al actualizar la calificación');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

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
                .then(data => {
                    const pending = data.filter(cita => cita.status === 0);
                    const completed = data.filter(cita => cita.status === 1);
                    setPendingCitas(pending);
                    setCompletedCitas(completed);
                })
                .catch(error => {
                    console.error('Error:', error);
                    setError(error.message);
                });
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
            <div className="flex items-center justify-center mt-20">
                <div className='flex flex-col items-center justify-center w-4/5'>
                    <h1 className="font-semibold text-4xl text-900">Hola,<span className='text-600'> {session.user.name}</span> !</h1>
                    <div className='flex mt-8 gap-6 w-full mb-4'>
                        {/* Perfil del usuario para editar */}
                        <div className='w-1/3 p-4 bg-100 border border-600 rounded-lg'>
                            <div className="flex flex-col items-center justify-center text-900 font-semibold">
                                <img
                                    src={session.user.image || ImgUser}
                                    alt={session.user.name}
                                    width={120}
                                    height={120}
                                    className="rounded-3xl mb-4"
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
                           {/*     {session.user.role === 'doctor' && (
                                    <div className='flex flex-col justify-center items-center'>
                                        <button className="w-full justify-center border border-600 bg-white text-black p-2 rounded-2xl hover:bg-200 flex items-center space-x-6" onClick={() => router.push(`/edit-profile?email=${session.user.email}`)}>
                                            <Image src="/static/media/logoqery.png" alt="Edit Profile" width={40} height={40} className='rounded-lg' />
                                            <span className='text-xl'>Vincula tu cuenta con qery </span>
                                        </button>
                                        <a href='https://qery.me/mas'>¿Qué es Query?</a>
                                    </div>
                                )} */}
                            </div>
                        </div>
                        {/* Sección de las citas del usuario */}
                        <div className="w-2/3 p-4 bg-100 border border-600 rounded-lg overflow-y-auto max-w-2/3 max-h-[90vh]">
                            <div className='flex flex-col items-center justify-center text-900 font-semibold'>
                                <div className='flex flex-col items-center justify-center text-900 font-bold'>
                                    <h2 className="mt-4 text-2xl">Citas Pendientes</h2>
                                    <h1 className=''>Tienes <span className="text-red-700">{pendingCitas.length}</span> citas agenda(as).</h1>
                                    <table className='table-auto w-full text-left whitespace-no-wrap mt-2'>
                                        <thead>
                                            <tr>
                                                <th className='px-4 py-2 border border-gray-400'>Fecha</th>
                                                <th className='px-4 py-2 border border-gray-400'>Medico</th>
                                                <th className='px-4 py-2 border border-gray-400'>Especialidad</th>
                                                <th className='px-4 py-2 border border-gray-400'>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {pendingCitas.map((cita, index) => (
                                                <tr key={index} className='bg-white p-4 m-2 text-black border-b-2 border-gray-300'>
                                                    <td className='px-4 py-2 border border-gray-400'>{new Date(cita.appointmentDate).toLocaleString()}</td>
                                                    <td className='px-4 py-2 border border-gray-400'>{cita.doctorName}</td>
                                                    <td className='px-4 py-2 border border-gray-400'>{cita.speciality}</td>
                                                    <td className='px-4 py-2 border border-gray-400'>
                                                        <button className='flex text-xl p-1 text-600 font-bold mb-4 mt-4 cursor-pointer hover:bg-200 hover:text-800 bg-50 border border-900 rounded-lg' onClick={() => deleteCita(cita._id)}>
                                                            <Image src={ImgDelete} alt="Delete" width={30} height={30} />
                                                            Cancelar
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <h2 className="mt-8 text-2xl">Citas Completadas</h2>
                                    <h1 className=''>Tienes <span className="text-red-700">{completedCitas.length}</span> citas finalizadas.</h1>
                                    <table className='table-auto w-full text-left whitespace-no-wrap mt-2'>
                                        <thead>
                                            <tr>
                                                <th className='px-4 py-2 border border-gray-400'>Fecha</th>
                                                <th className='px-4 py-2 border border-gray-400'>Medico</th>
                                                <th className='px-4 py-2 border border-gray-400'>Especialidad</th>
                                                <th className='px-4 py-2 border border-gray-400'>Calificación</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {completedCitas.map((cita, index) => (
                                                <tr key={index} className='bg-white p-4 m-2 text-black border-b-2 border-gray-300'>
                                                    <td className='px-4 py-2 border border-gray-400'>{new Date(cita.appointmentDate).toLocaleString()}</td>
                                                    <td className='px-4 py-2 border border-gray-400'>{cita.doctorName}</td>
                                                    <td className='px-4 py-2 border border-gray-400'>{cita.speciality}</td>
                                                    <td className='px-4 py-2 border border-gray-400'>
                                                        {cita.rating > 0 ? (
                                                            <div className="flex items-center">
                                                                <span className="mr-2">Gracias por tu calificación:</span>
                                                                <StarRaiting rating={cita.rating} onRate={() => { }} />
                                                            </div>
                                                        ) : (
                                                            <StarRaiting rating={0} onRate={(rating) => handleRate(cita._id, rating)} />
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default Profile;

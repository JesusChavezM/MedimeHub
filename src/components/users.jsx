"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ImgUser from "../assets/img_user.svg";
import ImgDoctor from "../assets/img_doctor.svg";
import ImgEdit from "../assets/img_edit.svg";
import ImgDelete from "../assets/img_delete.svg";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [expandedOptions, setExpandedOptions] = useState({});

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch("/api/users", { cache: "no-store" });
      const data = await response.json();
      setUsers(data);
    };

    getUsers();
  }, []);

  useEffect(() => {
    const getDoctors = async () => {
      const response = await fetch("/api/doctors", { cache: "no-store" });
      const data = await response.json();
      setDoctors(data);
    };

    getDoctors();
  }, []);

  const deleteUser = async (id) => {
    const response = await fetch(`/api/users?id=${id}`, { method: "DELETE" });
    const data = await response.json();

    if (data.error) {
      console.error(data.error);
    } else {
      setUsers(users.filter((user) => user._id !== id));
    }
  };

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
    <div className="flex min-h-90vh flex-col items-center justify-between p-6">
      <h1 className="flex items-center justify-center text-2xl font-bold mb-4 mt-24 xl:mt-8 md:mt-8">
        Lista de Usuarios
      </h1>
      <div className="w-full">
        <div className="hidden sm:block">
          <table className="w-full border-collapse border border-800">
            <thead>
              <tr className="bg-purple-200">
                <th className="border border-800">Foto</th>
                <th className="border border-800 p-2">Nombre</th>
                <th className="border border-800 p-2 hidden md:table-cell">
                  Correo Electrónico
                </th>
                <th className="border border-800 p-2 hidden md:table-cell">
                  ID
                </th>
                <th className="border border-800 p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="bg-100">
                  <td className="border border-800 p-px">
                    <div className="flex items-center justify-center">
                      <img
                        src={user.image || ImgUser}
                        className="w-10 h-10 rounded-full"
                      />
                    </div>
                  </td>
                  <td className="border border-800 p-2">{user.name}</td>
                  <td className="border border-800 p-2 hidden md:table-cell">
                    {user.email}
                  </td>
                  <td className="border border-800 p-2 hidden md:table-cell">
                    {user._id}
                  </td>
                  <td className="border border-800 p-2 space-x-2">
                    <button onClick={() => deleteUser(user._id)}>
                      <Image
                        src={ImgDelete}
                        height={20}
                        width={20}
                        alt="delete-button"
                      />
                    </button>
                    <button onClick={() => editUser(user._id)}>
                      <Image
                        src={ImgEdit}
                        height={18}
                        width={18}
                        alt="edit-button"
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
              {users.map((user) => (
                <div
                  key={user._id}
                  className="bg-purple-200 border border-purple-800 rounded-lg shadow-md p-4 m-1 "
                >
                  <div className="flex items-center mb-2">
                    <img
                      src={user.image || ImgUser}
                      alt={user.name}
                      className="w-10 h-10 rounded-full mr-2"
                    />
                    <div>
                      <p className="font-bold text-lg">{user.name}</p>
                      <p className="text-gray-500 truncate">{user.email}</p>
                      <p className="text-gray-500 truncate">Id: {user._id}</p>
                      <p className="flex gap-2">
                        {" "}
                        Acciones:
                        <button onClick={() => deleteUser(user._id)}>
                          <Image
                            src={ImgDelete}
                            height={20}
                            width={20}
                            alt="delete-button"
                          />
                        </button>
                        <button onClick={() => editUser(user._id)}>
                          <Image
                            src={ImgEdit}
                            height={18}
                            width={18}
                            alt="edit-button"
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
      <div className="flex items-center justify-center">
        <h1 className="text-2xl font-bold mb-4 mt-24 xl:mt-8 md:mt-8">
          Lista de Doctores
        </h1>
        <Link
          className="text-xl p-1 text-600 font-bold mb-4 mt-24 xl:mt-8 md:mt-8 cursor-pointer hover:bg-400 hover:text-100 ml-10 bg-200 border border-900 rounded-lg"
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

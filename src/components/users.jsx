import { useEffect, useState } from "react";
import Image from "next/image";
import ImgUser from "../assets/img_user.svg";
import ImgDelete from "../assets/img_delete.svg";

export default function UsersPage() {
  const [admins, setAdmins] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const response = await fetch("/api/users", { cache: "no-store" });
    const data = await response.json();
    setAdmins(data.filter((user) => user.role === "admin"));
    setDoctors(data.filter((user) => user.role === "doctor"));
    setUsers(data.filter((user) => user.role === "user"));
  };

  useEffect(() => {
    getUsers();
  }, []);

  const deleteUser = async (id) => {
    const response = await fetch(`/api/users?id=${id}`, { method: "DELETE" });
    const data = await response.json();

    if (data.error) {
      console.error(data.error);
    } else {
      getUsers(); // Vuelve a cargar todas las tablas después de eliminar un usuario
    }
  };

  const updateUserRole = async (userId, isAdmin) => {
    const newRole = isAdmin ? "admin" : "user";
    console.log("User ID:", userId);
    console.log("New Role:", newRole);

    try {
      const response = await fetch(`/api/user?id=${encodeURIComponent(userId)}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update user role. Status: ${response.status}`);
      }

      getUsers(); // Vuelve a cargar todas las tablas después de actualizar el rol de un usuario
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  const renderTable = (title, data) => (
    <div className="w-full mb-8">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <table className="w-full border-collapse border border-800">
        <thead>
          <tr className="bg-purple-200">
            <th className="border border-800">Foto</th>
            <th className="border border-800 p-2">Nombre</th>
            <th className="border border-800 p-2 hidden md:table-cell">Correo Electrónico</th>
            <th className="border border-800 p-2">Rol</th>
            <th className="border border-800 p-2">Admin</th>
            <th className="border border-800 p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
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
              <td className="border border-800 p-2 hidden md:table-cell">{user.email}</td>
              <td className="border border-800 p-2 hidden md:table-cell">{user.role}</td>
              <td className="border border-800 p-2 text-center">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={user.role === "admin"}
                    onChange={(e) => updateUserRole(user._id, e.target.checked)}
                    className="form-checkbox h-5 w-5 text-600 transition duration-150 ease-in-out rounded-md border-gray-300 focus:ring-500 focus:border-500"
                  />
                  <span className="ml-2 text-800">Admin</span>
                </label>
              </td>
              <td className="border border-800 p-2 space-x-2">
                <button className="text-500 hover:text-700 bg-200 rounded-lg p-1 border border-600" onClick={() => deleteUser(user._id)}>
                  <Image src={ImgDelete} height={20} width={20} alt="delete-button" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="flex min-h-90vh flex-col items-center justify-between p-6">
      <h1 className="flex items-center justify-center text-2xl font-bold mb-4 w-full">Lista de Usuarios</h1>
      <div className="w-full">
        <div className="hidden sm:block">
          {renderTable("Administradores", admins)}
          {renderTable("Doctores", doctors)}
          {renderTable("Usuarios", users)}
        </div>
      </div>
    </div>
  );
}

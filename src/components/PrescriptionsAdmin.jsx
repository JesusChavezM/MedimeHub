import { useEffect, useState } from "react";
import Image from "next/image";
import ImgUser from "../assets/img_user.svg";
import ImgDelete from "../assets/img_delete.svg";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";


export default function UsersPage() {
    const [prescriptions, setPrescriptions] = useState([]);
    const { data: session, status: sessionStatus } = useSession();

    const getPrescriptions = async () => {
        try {
            const response = await fetch("/api/prescriptions/admin", { cache: "no-store" });
            const data = await response.json();
            setPrescriptions(data);
        } catch (error) {
            console.error("Error fetching prescriptions", error);
        }
    };

    useEffect(() => {
        getPrescriptions();
    }, []);

    const deletePrescription = async (id) => {
        const response = await fetch(`/api/prescriptions/admin?id=${id}`, { method: "DELETE" });
        const data = await response.json();
        if (data.error) {
            console.error(data.error);
        } else {
            getPrescriptions();
        }
    };


    return (
        sessionStatus === "authenticated" && (
            <div className="flex flex-col items-center justify-between p-6">
                <div className="flex items-center justify-center mb-4 w-full">
                    <h2 className="text-2xl font-bold xl:mt-0 md:mt-0">Recetas Creadas</h2>
                </div>
                <div className="w-full">
                    <div className="hidden sm:block">
                        <table className="w-full border-collapse border border-800">
                            <thead>
                                <tr className="bg-purple-200">
                                    <th className="border border-800">Doctor</th>
                                    <th className="border border-800 p-2">Paciente</th>
                                    <th className="border border-800 p-2">Fecha</th>
                                    <th className="border border-800 p-2">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {prescriptions.map((prescription) => (
                                    <tr key={prescription._id} className="bg-100">
                                        <td className="border border-800 p-2">{prescription?.doctor?.name}</td>
                                        <td className="border border-800 p-2 hidden md:table-cell">{prescription?.patient?.name}</td>
                                        <td className="border border-800 p-2 hidden md:table-cell">{new Date(prescription?.date).toLocaleDateString()}</td>
                                        <td className="border border-800 p-2 space-x-2">
                                            <button className="text-500 hover:text-700 bg-200 rounded-lg p-1 border border-600" onClick={() => deletePrescription(prescription._id)}>
                                                <Image src={ImgDelete} height={20} width={20} alt="delete-button" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    );
}
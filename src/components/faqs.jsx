"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ImgDelete from "../assets/img_delete.svg";

export default function FaqsPage() {

    const [faqs, setFaqs] = useState([]);


    useEffect(() => {
        const getFaqs = async () => {
            const response = await fetch("/api/faq", { cache: "no-store" });
            const data = await response.json();
            setFaqs(data);
        }
        getFaqs();
    }, []);

    const deleteFaq = async (id) => {
        const response = await fetch(`/api/faq?id=${id}`, { method: "DELETE" });
        const data = await response.json();

        if (data.error) {
            console.error(data.error);
        } else {
            setFaqs(faqs.filter((faq) => faq._id !== id));
        }
    };



    return (
        <div className="flex flex-col items-center justify-between p-6">
            <div className="flex items-center justify-center mb-4 w-full">
                <h1 className="text-2xl font-bold xl:mt-0 md:mt-0">
                    Preguntas Frecuentes                </h1>
                <Link
                    className="text-xl p-1 text-600 font-bold  xl:mt-0 md:mt-0 cursor-pointer hover:bg-400 hover:text-100 bg-200 border border-900 rounded-lg fill-current ml-auto shrink-0"
                    href="/faqs-add"
                >
                    Agregar Pregunta
                </Link>
            </div>
            <div className="w-full">
                <div className="hidden sm:block">
                    <table className="w-full border-collapse border border-800">
                        <thead>
                            <tr className="bg-purple-200">
                                <th className="border border-800">ID</th>
                                <th className="border border-800 p-2">Pregunta</th>
                                <th className="border border-800 p-2">Respuesta</th>
                                <th className="border border-800 p-2">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {faqs.map((faq) => (
                                <tr key={faq._id} className="bg-100">
                                    <td className="border border-800">{faq._id}</td>
                                    <td className="border border-800 p-2">{faq.question}</td>
                                    <td className="border border-800 p-2">{faq.answer}</td>                                
                                    <td className="border border-800 p-2">
                                        <button
                                            className="text-500 hover:text-700"
                                            onClick={() => deleteFaq(faq._id)}
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
                            {faqs.map((faq) => (
                                <div key={faq._id} className="bg-200 p-4 rounded-lg">
                                    <div className="flex justify-between">
                                        <div className="text-500">{faq.question}</div>
                                        <div className="flex items-center">
                                            <Link href={`/faqs-edit?id=${faq._id}`}>
                                                {/* <a className="text-500 hover:text-700">Editar</a> */}
                                            </Link>
                                            <button
                                                className="text-500 hover:text-700"
                                                onClick={() => deleteFaq(faq._id)}
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                    <div className="text-500">{faq.answer}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

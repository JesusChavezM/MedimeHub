"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const FaqEdit = () => {
    const router = useRouter();
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");

        const fetchFaqDetails = async () => {
            try {
                const response = await fetch(`/api/faqEdit?id=${id}`);
                const data = await response.json();
                if (data.length > 0) {
                    setQuestion(data[0].question || "");
                    setAnswer(data[0].answer || "");
                }
            } catch (error) {
                console.error("Error fetching faq details:", error);
            }
        };

        fetchFaqDetails();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");

        const faqData = {
            question,
            answer,
        };

        try {
            await fetch(`/api/faq?id=${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(faqData),
            });
            router.replace("/faq");
        } catch (error) {
            console.error("Error updating faq:", error);
        }
    };


    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="bg-100 p-8 rounded shadow-md w-96 border border-600">
                <h1 className="text-900 text-4xl text-center font-bold mb-8">Edit FAQ</h1>
                <form onSubmit={handleSubmit}>
                    <span className="text-800 text-md text-center font-bold mb-8">Pregunta:</span>
                    <textarea
                        id="question"
                        className="w-full border border-600 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-900 focus:text-black"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                    <span className="text-800 text-md text-center font-bold mb-8">Respuesta:</span>
                    <textarea
                        id="answer"
                        className="w-full border border-600 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-900 focus:text-black"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                    />
                    <button
                            type="submit"
                            className="w-full bg-600 text-50 py-2 rounded-2xl hover:bg-700 cursor-pointer"
                        >
                            {" "}
                            Actualizar Pregunta
                        </button>
                </form>
            </div>
        </div>
    );
};

export default FaqEdit;

"use client";
import React, { useState, useEffect } from 'react';
import ImgOpen from "../../assets/img_open.svg";
import ImgClose from "../../assets/img_close.svg";

export default function Faq() {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    fetch('/api/faq')
      .then(response => response.json())
      .then(data => setFaqs(data));
  }, []);

  const handleClick = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <div className='mt-28'>
      <div className="sm:px-8 px-4 flex-grow">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-950 mb-4">Preguntas frecuentes</h2>
          <p className="text-lg text-900 mt-2">Bienvenido a nuestra sección de Preguntas Frecuentes (FAQ). Aquí encontrarás respuestas a las preguntas más comunes sobre nuestros servicios, productos y políticas. Si no encuentras la respuesta que buscas, no dudes en ponerte en contacto con nuestro equipo de soporte.<span className='text-700 font-bold'> ¡Estamos aquí para ayudarte!</span></p>
        </div>
        {/* Preguntas */}
        <div className="grid lg:grid-cols-2 gap-6">
          {faqs.map((faq, index) => (
            <div key={index} className="space-y-6">
              <div className="bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-lg">
                <button type="button" onClick={() => handleClick(index)} className="w-full text-base font-semibold text-left p-6 text-[#333] flex items-center">
                  <span>{faq.question}</span>
                  <img src={openIndex === index ? ImgClose : ImgOpen} alt={openIndex === index ? "Cerrar" : "Abrir"} className="w-4 fill-current ml-auto shrink-0" />
                </button>
                <div className={openIndex === index ? "pb-5 px-6" : "hidden pb-5 px-6"}>
                  <p className="text-sm text-gray-600">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

"use client";
import React, { useState, useEffect } from 'react';

export default function Faq() {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    fetch('/api/faqs') // Asegúrate de reemplazar esto con la URL de tu API
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
      <div className="sm:px-8 px-4">
        <div className="mb-12 max-w-4xl">
          <h2 className="text-2xl font-bold text-800">Preguntas frecuentes</h2>
          <p className="text-base text-900 mt-6">Bienvenido a nuestra sección de Preguntas Frecuentes (FAQ). Aquí encontrarás respuestas a las preguntas más comunes sobre nuestros servicios, productos y políticas. Si no encuentras la respuesta que buscas, no dudes en ponerte en contacto con nuestro equipo de soporte. ¡Estamos aquí para ayudarte!</p>
        </div>
        {/* Preguntas */}
        <div className="grid lg:grid-cols-2 gap-6">
          {faqs.map((faq, index) => (
            <div key={index} className="space-y-6">
              <div className="bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-lg">
                <button type="button" onClick={() => handleClick(index)} className="w-full text-base font-semibold text-left p-6 text-[#333] flex items-center">
                  <span className="mr-4">{faq.question}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 fill-current ml-auto shrink-0" viewBox="0 0 124 124">
                    <path d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z" data-original="#000000" />
                  </svg>
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

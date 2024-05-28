'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import cita from '../../assets/img_cita.svg';
import doctor from '../../assets/img_doctor.svg';
import expediente from '../../assets/img_expediente.svg';
import receta from '../../assets/img_receta.svg';
import Maps from '../../components/Maps';
import { useSession } from 'next-auth/react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Inicio = () => {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    if (sessionStatus === 'unauthenticated') {
      router.replace('/');
    }
  }, [sessionStatus, router]);

  useEffect(() => {
    fetch('/api/locations')
      .then(response => response.json())
      .then(data => setLocations(data))
      .catch(error => console.error('Error fetching locations:', error));
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Ajusta la cantidad de ubicaciones que se muestran en cada diapositiva
    slidesToScroll: 1,
    autoplay: true, // Habilita el movimiento automático del carrusel
    autoplaySpeed: 3000, // Ajusta la velocidad de movimiento automático
  };

  if (sessionStatus === "loading") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-between p-24 text-900 font-bold">
        <h1>Cargando ...</h1>
      </div>
    );
  }

  return (
    <div>
      <div className="py-4 md:py-8 flex flex-col md:flex-row items-center justify-center">
        <div className="flex-col space-y-4 md:mr-8 text-left mt-32 md:mt-0 w-5/6 md:w-auto">
          <div className="w-full md:mr-8 md:w-auto text-950 text-3xl sm:text-2xl md:text-3xl font-semibold font text-center md:mb-8 md:text-left md:self-start">
            Servicios
          </div>
          {(session?.user.role === 'user' || session?.user.role === 'admin') && (
            <>
              <Link
                href="/prescriptions"
                className="flex flex-row items-center space-x-4 w-full rounded-lg bg-200 border border-600 hover:bg-300"
              >
                <Image src={receta} width={48} height={48} alt="recetas" />
                <div className="flex-grow">
                  <span className="text-950 text-lg md:text-2xl mr-2 font-semibold">
                    Consultar recetas médicas
                  </span>
                </div>
              </Link>
              <Link
                href="/doctors"
                className="flex flex-row items-center space-x-4 w-full rounded-lg bg-200 border border-600 hover:bg-300"
              >
                <Image src={doctor} width={48} height={48} alt="doctores" />
                <div className="flex-grow">
                  <span className="text-950 text-lg md:text-2xl mr-2 font-semibold">
                    Consultar doctores y Agendar
                  </span>
                </div>
              </Link>
              <Link
                href="/"
                className="flex flex-row items-center space-x-4 w-full rounded-lg bg-200 border border-600 hover:bg-300"
              >
                <Image src={expediente} width={48} height={48} alt="expediente" />
                <div className="flex-grow">
                  <span className="text-950 text-lg md:text-2xl mr-2 font-semibold">
                    Consultar expediente médico
                  </span>
                </div>
              </Link>
            </>
          )}
          {(session?.user.role === 'doctor' || session?.user.role === 'admin') && (
            <>
              <Link
                href="/appointments"
                className="flex flex-row items-center space-x-4 w-full rounded-lg bg-200 border border-600 hover:bg-300"
              >
                <Image src={cita} width={48} height={48} alt="citas" />
                <div className="flex-grow">
                  <span className="text-950 text-lg md:text-2xl mr-2 font-semibold">
                    Ver citas agendadas
                  </span>
                </div>
              </Link>
              <Link
                href="/patient-records"
                className="flex flex-row items-center space-x-4 w-full rounded-lg bg-200 border border-600 hover:bg-300"
              >
                <Image src={expediente} width={48} height={48} alt="expedientes" />
                <div className="flex-grow">
                  <span className="text-950 text-lg md:text-2xl mr-2 font-semibold">
                    Consultar expedientes
                  </span>
                </div>
              </Link>
            </>
          )}
        </div>
        <div className="flex flex-col md:mt-12 mt-4 md:items-start text-center w-5/6 md:w-auto">
          <div className="w-full md:w-auto mx-auto text-950 text-2xl sm:text-xl md:text-3xl font-semibold font text-center md:mb-0 md:text-left md:self-start">
            Hospitales
          </div>
          <div>
            <Maps />
          </div>
        </div>
      </div>
      <div>
        <Slider {...settings} className="w-4/5 mx-auto">
          {locations.map(location => (
            <span key={location._id} className='bg-700 rounded-full text-white px-3 mr-2 py-1 text-xs uppercase font-medium'>{location.name}</span>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Inicio;

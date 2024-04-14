import Cita from '../../../models/citaSchema';
import connect from '../../../lib/mongodb';
import { NextResponse } from 'next/server';

export const POST = async (request: any) => {
  const { fechaHora, duracionEstimada, tipo, medicoAsignado, motivo } = await request.json();

  await connect();

  const existingCita = await Cita.findOne({ fechaHora });

  if (existingCita) {
    return new NextResponse('Cita ya programada', { status: 400 });
  }

  const newCita = new Cita({
    fechaHora,
    duracionEstimada,
    tipo,
    medicoAsignado,
    motivo,
  });

  try {
    await newCita.save();
    return new NextResponse('Cita is registered', { status: 200 });
  } catch (err: any) {
    console.error(err); // Imprimir el error en la consola para depurar
    return new NextResponse('Error al guardar la cita', { status: 500 });
  }
};

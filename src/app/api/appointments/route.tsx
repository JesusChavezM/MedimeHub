import Cita from '../../../models/citaSchema';
import connect from '../../../lib/mongodb';
import { NextResponse } from 'next/server';


export const dynamic = "force-dynamic";

export async function GET(request: any) {
  await connect();
  const citas = await Cita.find({});
  return new NextResponse(JSON.stringify(citas), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export const POST = async (request: any) => {
  let { doctorName, userName, appointmentDate } = await request.json();

  await connect();

  const newCita = new Cita({
    doctorName,
    userName,
    appointmentDate,
  });

  try {
    await newCita.save();
    return new NextResponse("Cita registrada", { status: 200 });
  } catch (err: any) {
    console.error("Error:", err);
    return new NextResponse(err, {
      status: 500,
    });
  }
}

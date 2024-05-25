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
  let { doctorName, doctorEmail, pacientName, userEmail, speciality, appointmentDate } = await request.json();

  if (typeof speciality === 'string') {
    speciality = speciality.split(',').map((s: string) => s.trim());
  }

  await connect();

  const newCita = new Cita({
    doctorName,
    doctorEmail,
    pacientName,
    userEmail,
    speciality,
    appointmentDate,
    status: 0,
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

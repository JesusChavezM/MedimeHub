import { MongoClient, ObjectId } from 'mongodb';
import connect from "../../../lib/mongodb";
import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'url';
import Doctor from '../../../models/doctors';


export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    const url = process.env.MONGO_URI;
    
    const client = new MongoClient(url);

    try {
        await client.connect();

        const collection = client.db("test").collection("doctors");

        const doctors = await collection.find({}).toArray();

        return NextResponse.json(doctors);
    } catch (err) {
        console.error("Error:", err);
        return NextResponse.json({ error: 'Error connecting to the database'});
    } finally {
        await client.close();
    }
};

export const POST = async (request: any) => {
  let { license, name, speciality, phone, clinic, hospital } = await request.json();
  
  // Si speciality es una cadena, la dividimos por las comas para obtener un array
  if (typeof speciality === 'string') {
    speciality = speciality.split(',').map((s: string) => s.trim());
  }

  await connect();

  const existingDoctor = await Doctor.findOne({ license });

  if (existingDoctor) {
    return new NextResponse("El doctor ya esta registrado", { status: 400 });
  }

  const newDoctor = new Doctor({
    license,
    name,
    speciality, // Ahora speciality es un array
    phone,
    clinic,
    hospital,
  });
  try {
    await newDoctor.save();
    return new NextResponse("Doctor registrado", { status: 200 });
  } catch (err: any) {
    console.error("Error:", err);
    return new NextResponse(err, {
      status: 500,
    });
  }
};




export async function DELETE(request: NextRequest) {
  const url = process.env.MONGO_URI;
  
  // Parse the URL to get the query parameters
  const { query } = parse(request.nextUrl.href, true);
  const { id } = query;
  

  if (Array.isArray(id) || !id) {
    return NextResponse.json({ error: 'Se requiere el ID del doctor para eliminarlo' }, { status: 400 });
  }

  const client = new MongoClient(url);

  try {
    await client.connect();

    const collection = client.db("test").collection("doctors");

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Doctor no encontrado' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Doctor eliminado correctamente' });
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json({ error: 'Error conectando a la base de datos' }, { status: 500 });
  } finally {
    await client.close();
  }
}

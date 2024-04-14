import { MongoClient, ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'url';

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const url = process.env.MONGO_URI;
  
  const client = new MongoClient(url);

  try {
    await client.connect();

    const collection = client.db("test").collection("users");

    const users = await collection.find({}).toArray();

    return NextResponse.json(users);
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json({ error: 'Error conectando a la base de datos'});
  } finally {
    await client.close();
  }
}

export async function DELETE(request: NextRequest) {
  const url = process.env.MONGO_URI;
  
  // Parse the URL to get the query parameters
  const { query } = parse(request.nextUrl.href, true);
  const { id } = query;
  

  if (Array.isArray(id) || !id) {
    return NextResponse.json({ error: 'Se requiere el ID del usuario para eliminarlo' }, { status: 400 });
  }

  const client = new MongoClient(url);

  try {
    await client.connect();

    const collection = client.db("test").collection("users");

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Usuario eliminado correctamente' });
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json({ error: 'Error conectando a la base de datos' }, { status: 500 });
  } finally {
    await client.close();
  }
}

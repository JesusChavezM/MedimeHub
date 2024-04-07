import { MongoClient } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';
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

import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

export default async function GET() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

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

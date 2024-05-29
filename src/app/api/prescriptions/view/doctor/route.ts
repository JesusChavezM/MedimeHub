import { MongoClient, ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'url';

export async function GET(request: any) {
    const url = process.env.MONGO_URI;
    const client = new MongoClient(url);
    const { query } = parse(request.nextUrl.href, true);
    const { email } = query;

    if (Array.isArray(email) || !email) {
        return NextResponse.json({ error: 'Se requiere el email del usuario para buscar sus citas' }, { status: 400 });
    }

    try {
        await client.connect();

        const collection = client.db("test").collection("prescriptions");

        const prescriptions = await collection.find({ doctorEmail: email }).toArray();

        return NextResponse.json(prescriptions);
    } catch (error) {
        console.error("Error: ", error);
        return NextResponse.error();
    } finally {
        await client.close();
    }
}
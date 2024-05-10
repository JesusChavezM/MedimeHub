import connect from "../../../lib/mongodb";
import { MongoClient, ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
import { parse } from 'url';

export const dynamic = "force-dynamic";

export async function GET(request: any) {
    const url = process.env.MONGO_URI;
    const client = new MongoClient(url);

    // Parse the URL to get the query parameters
    const { query } = parse(request.nextUrl.href, true);
    const { email } = query;

    if (Array.isArray(email) || !email) {
        return NextResponse.json({ error: 'Se requiere el email del usuario para buscar sus citas' }, { status: 400 });
    }

    try {
        await client.connect();

        const collection = client.db("test").collection("citas");

        // Find appointments by user email
        const citas = await collection.find({ userEmail: email }).toArray();

        return NextResponse.json(citas);
    } catch (err) {
        console.error("Error:", err);
        return NextResponse.json({ error: 'Error connecting to the database' });
    } finally {
        await client.close();
    }
}

export async function DELETE(request: any) {
    const url = process.env.MONGO_URI;
    const client = new MongoClient(url);

    // Parse the URL to get the query parameters
    const { query } = parse(request.nextUrl.href, true);
    const { id } = query;

    if (Array.isArray(id) || !id) {
        return NextResponse.json({ error: 'Se requiere el id de la cita a eliminar' }, { status: 400 });
    }
    try {
        await client.connect();

        const collection = client.db("test").collection("citas");

        // Find and delete the appointment by id
        await collection.deleteOne({ _id: new ObjectId(id) });

        return NextResponse.json({ message: 'Cita eliminada' });
    } catch (err) {
        console.error("Error:", err);
        return NextResponse.json({ error: 'Error connecting to the database' });
    } finally {
        await client.close();
    }
}
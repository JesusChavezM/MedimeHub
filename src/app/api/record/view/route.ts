import { MongoClient, ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'url';

export const dynamic = "force-dynamic";

export async function GET(request) {
    const url = process.env.MONGO_URI;
    const client = new MongoClient(url);

    const { query } = parse(request.nextUrl.href, true);
    const { id } = query;

    if (!id || Array.isArray(id)) {
        return NextResponse.json({ error: 'se necesita el id para encontrar la receta' }, { status: 400 });
    }

    try {
        await client.connect();
        const collection = client.db("test").collection("records");

        const cita = await collection.findOne({ _id: new ObjectId(id) });

        if (!cita) {
            return NextResponse.json({ error: 'prescription not found' }, { status: 404 });
        }

        return NextResponse.json(cita);
    } catch (err) {
        console.error("Error:", err);
        return NextResponse.json({ error: 'Error connecting to the database' }, { status: 500 });
    } finally {
        await client.close();
    }
}
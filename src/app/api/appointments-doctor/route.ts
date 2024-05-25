import { MongoClient, ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
import { parse } from 'url';
import connect from '../../../lib/mongodb';

export const dynamic = "force-dynamic";

export async function GET(request) {
    const url = process.env.MONGO_URI;
    const client = new MongoClient(url);

    const { query } = parse(request.nextUrl.href, true);
    const { email } = query;

    if (Array.isArray(email) || !email) {
        return NextResponse.json({ error: 'Se requiere el email del usuario para buscar sus citas' }, { status: 400 });
    }

    try {
        await client.connect();
        const collection = client.db("test").collection("citas");

        const agenda = await collection.find({ doctorEmail: email }).toArray();

        return NextResponse.json(agenda);
    } catch (err) {
        console.error("Error:", err);
        return NextResponse.json({ error: 'Error connecting to the database' });
    } finally {
        await client.close();
    }
}

export async function PUT(request) {
    const url = process.env.MONGO_URI;
    const client = new MongoClient(url);

    try {
        await client.connect();
        const collection = client.db("test").collection("citas");

        const { id } = await request.json();

        if (!id) {
            return NextResponse.json({ error: 'Se requiere el ID de la cita para actualizar el estado' }, { status: 400 });
        }

        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { status: 1 } }
        );

        if (result.modifiedCount === 0) {
            return NextResponse.json({ error: 'No se encontró la cita o no se pudo actualizar' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Estado de la cita actualizado exitosamente' });
    } catch (err) {
        console.error("Error:", err);
        return NextResponse.json({ error: 'Error updating the appointment status' }, { status: 500 });
    } finally {
        await client.close();
    }
}

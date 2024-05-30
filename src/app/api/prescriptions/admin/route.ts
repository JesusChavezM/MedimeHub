import { MongoClient, ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'url';


export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    const url = process.env.MONGO_URI;

    const client = new MongoClient(url);

    try {
        await client.connect();

        const collection = client.db("test").collection("prescriptions");

        const prescriptions = await collection.find({}).toArray();

        return NextResponse.json(prescriptions);
    } catch (err) {
        console.error("Error:", err);
        return NextResponse.json({ error: 'Error conectando a la base de datos' });
    } finally {
        await client.close();
    }
}

export async function DELETE(request: NextRequest) {
    const url = process.env.MONGO_URI;

    const client = new MongoClient(url);

    try {
        await client.connect();

        const collection = client.db("test").collection("prescriptions");

        const { query } = parse(request.nextUrl.href, true);
        const { id } = query;

        const result = await collection.deleteOne({ _id: new ObjectId(id as string) });

        if (result.deletedCount === 1) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ error: 'No se encontró la receta' });
        }
    } catch (err) {
        console.error("Error:", err);
        return NextResponse.json({ error: 'Error conectando a la base de datos' });
    } finally {
        await client.close();
    }
}
import { MongoClient, ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
import { parse } from 'url';
import connect from '../../../lib/mongodb';

export const dynamic = "force-dynamic";

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
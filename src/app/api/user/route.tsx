import { MongoClient, ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'url';


export async function GET(request: NextRequest) {
    const url = process.env.MONGO_URI;

    // Parse the URL to get the query parameters
    const { query } = parse(request.nextUrl.href, true);
    const { email } = query;

    if (Array.isArray(email) || !email) {
        return NextResponse.json({ error: 'Se requiere el correo electrónico del usuario' }, { status: 400 });
    }

    const client = new MongoClient(url);

    try {
        await client.connect();

        const collection = client.db("test").collection("users");

        const user = await collection.findOne({ email: email });

        if (!user) {
            return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (err) {
        console.error("Error:", err);
        return NextResponse.json({ error: 'Error conectando a la base de datos' }, { status: 500 });
    } finally {
        await client.close();
    }
}

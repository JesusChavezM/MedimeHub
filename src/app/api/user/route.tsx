import { MongoClient, ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'url';



const url = process.env.MONGO_URI;

export async function GET(request: NextRequest) {
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

export async function PUT(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('id');
    
    if (!userId) {
        console.error("ID de usuario no proporcionado");
        return NextResponse.json({ error: 'Se requiere el ID del usuario' }, { status: 400 });
    }

    let newRole;
    try {
        const body = await request.json();
        newRole = body.role;
    } catch (error) {
        console.error("Error parsing request body:", error);
        return NextResponse.json({ error: 'Error parsing request body' }, { status: 400 });
    }

    if (!newRole) {
        console.error("Nuevo rol no proporcionado");
        return NextResponse.json({ error: 'Se requiere el nuevo rol' }, { status: 400 });
    }

    const client = new MongoClient(url);

    try {
        await client.connect();
        const db = client.db("test");
        const collection = db.collection("users");

        const result = await collection.updateOne(
            { _id: new ObjectId(userId) },
            { $set: { role: newRole } }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Usuario actualizado exitosamente' });
    } catch (err) {
        console.error("Error:", err);
        return NextResponse.json({ error: 'Error actualizando el usuario' }, { status: 500 });
    } finally {
        await client.close();
    }
}
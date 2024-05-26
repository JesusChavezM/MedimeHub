import Faq from '../../../models/faq';
import connect from '../../../lib/mongodb';
import { parse } from 'url';
import { NextResponse } from 'next/server';

export const dynamic = "force-dynamic";

export async function GET(request: any) {
    await connect();
    const faqs = await Faq.find({});
    return new NextResponse(JSON.stringify(faqs), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export const POST = async (request: any) => {
    let { question, answer } = await request.json();

    await connect();

    const newFaq = new Faq({
        question,
        answer,
    });

    try {
        await newFaq.save();
        return new NextResponse("Pregunta registrada", { status: 200 });
    } catch (err: any) {
        console.error("Error:", err);
        return new NextResponse(err, {
            status: 500,
        });
    }
}

export const DELETE = async (request: any) => {
    const { query } = parse(request.nextUrl.href, true);
    const { id } = query;

    await connect();

    try {
        await Faq.findByIdAndDelete(id);
        return new NextResponse("Pregunta eliminada", { status: 200 });
    } catch (err: any) {
        console.error("Error:", err);
        return new NextResponse(err, {
            status: 500,
        });
    }
}

export const PUT = async (request: any) => {
    try {
        const { query } = parse(request.nextUrl.href, true);
        const { id } = query;

        // Verificar si se proporciona el ID
        if (!id) {
            return new NextResponse("ID de pregunta no proporcionado", { status: 400 });
        }

        const { question, answer } = await request.json();

        // Validar datos
        if (!question || !answer) {
            return new NextResponse("La pregunta y la respuesta son obligatorias", { status: 400 });
        }

        // Actualizar la pregunta en la base de datos
        const updatedFaq = await Faq.findByIdAndUpdate(id, { question, answer }, { new: true });

        if (!updatedFaq) {
            // Si no se encuentra la pregunta, devolver un error
            return new NextResponse("Pregunta no encontrada", { status: 404 });
        }

        // Devolver una respuesta exitosa con la pregunta actualizada
        return new NextResponse(updatedFaq, { status: 200 });
    } catch (err: any) {
        console.error("Error:", err);
        // Devolver una respuesta de error con el estado 500
        return new NextResponse("Error al actualizar la pregunta", { status: 500 });
    }
}

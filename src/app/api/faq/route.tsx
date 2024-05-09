import Faq from '../../../models/faq';
import connect from '../../../lib/mongodb';
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
    let { id } = await request.json();

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
import connect from '../../../lib/mongodb';
import Faq from '../../../models/faq';
import { MongoClient, ObjectId } from 'mongodb'; // Importa ObjectId para manejar el ID de MongoDB
import { NextResponse } from 'next/server';
import { parse } from 'url';


export const dynamic = "force-dynamic";

export async function GET(request: any) {
    try {
        await connect();
        const faqs = await Faq.find({}).lean(); // Utiliza lean() para evitar el objeto circular
        return new NextResponse(JSON.stringify(faqs), {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Error fetching FAQs:", error);
        return new NextResponse("Error fetching FAQs", {
            status: 500,
        });
    }
}
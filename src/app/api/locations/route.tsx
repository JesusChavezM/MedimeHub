import Location from '../../../models/location';
import connect from '../../../lib/mongodb';
import { parse } from 'url';
import { NextResponse } from 'next/server';


export const dynamic = "force-dynamic";

export async function GET(request: any) {
    await connect();
    const locations = await Location.find({});
    return new NextResponse(JSON.stringify(locations), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export const POST = async (request: any) => {
    let { name, lat, lng } = await request.json();

    await connect();

    const newLocation = new Location({
        name,
        lat,
        lng,
    });

    try {
        await newLocation.save();
        return new NextResponse("Ubicación registrada", { status: 200 });
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
        await Location.findByIdAndDelete(id);
        return new NextResponse("Ubicación eliminada", { status: 200 });
    } catch (err: any) {
        console.error("Error:", err);
        return new NextResponse(err, {
            status: 500,
        });
    }
}

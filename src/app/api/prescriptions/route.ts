import Prescription from "../../../models/prescription";
import { MongoClient, ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';
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

        const collection = client.db("test").collection("prescriptions");

        const prescriptions = await collection.find({ userEmail: email }).toArray();

        return NextResponse.json(prescriptions);
    } catch (error) {
        console.error("Error: ", error);
        return NextResponse.error();
    } finally {
        await client.close();
    }
}

export async function POST(request: any) {
    const {
        doctorName,
        doctorLicense,
        doctorSpeciality,
        doctorPhone,
        patientName,
        patientAge,
        patientDateOfBirth,
        patientAddress,
        medicationName,
        dosage,
        routeOfAdministration,
        frequency,
        duration,
        additionalInstructions,
        doctorInstructions,
        doctorSignature,
        controlledSubstanceFolioNumber,
        controlledSubstanceBarcode
    } = await request.json();

    await connect();

    const newPrescription = new Prescription({
        doctor: {
            name: doctorName,
            license: doctorLicense,
            speciality: doctorSpeciality,
            phone: doctorPhone
        },
        patient: {
            name: patientName,
            age: patientAge,
            dateOfBirth: patientDateOfBirth,
            address: patientAddress
        },
        treatment: {
            medicationName,
            dosage,
            routeOfAdministration,
            frequency,
            duration,
            additionalInstructions
        },
        doctorInstructions,
        doctorSignature,
        controlledSubstance: {
            folioNumber: controlledSubstanceFolioNumber,
            barcode: controlledSubstanceBarcode
        }
    });

    try {
        await newPrescription.save();
        return NextResponse.json('Receta creada exitosamente', { status: 200 });
    } catch (error) {
        console.error("Error: ", error);
        return NextResponse.error();
    }
}
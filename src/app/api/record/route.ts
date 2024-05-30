import Record from "../../../models/records";
import { MongoClient, ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'url';
import connect from '../../../lib/mongodb';

export const dynamic = "force-dynamic";

export async function POST(request: any) {
    const requestData = await request.json();

    await connect();

    const {
        doctorEmail,
        patientEmail,
        folio,
        doctorName,
        doctorLicense,
        doctorSpeciality,
        doctorPhone,
        patientName,
        patientAge,
        patientDateOfBirth,
        patientAddress,
        singsBloodPressure,
        singsHeartRate,
        singsWeight,
        singsHeight,
        historyChronicDiseases,
        historySurgeries,
        historyAllergies,
        historyMedications,
        appointmentSymptomsSymptoms,
        appointmentSymptomsDiagnosis,
        observations,
    } = requestData;

    // Comprobación de campos requeridos
    if (!doctorEmail || !patientEmail || !doctorName || !doctorLicense || !doctorSpeciality || !doctorPhone || !patientName || !patientAge || !patientDateOfBirth || !patientAddress || !singsBloodPressure || !singsHeartRate || !singsWeight || !singsHeight || !historyChronicDiseases || !historySurgeries || !historyAllergies || !historyMedications || !appointmentSymptomsSymptoms || !appointmentSymptomsDiagnosis || !observations) {
        return new Response('Faltan campos requeridos en la solicitud', { status: 400 });
    }

    const record = new Record({
        doctorEmail,
        patientEmail,
        folio,
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
        Sings: [{
            bloodPressure: singsBloodPressure,
            heartRate: singsHeartRate,
            weight: singsWeight,
            height: singsHeight
        }],
        history: [{
            chronicDiseases: historyChronicDiseases,
            surgeries: historySurgeries,
            allergies: historyAllergies,
            medications: historyMedications
        }],
        appointmentSymptoms: [{
            symptoms: appointmentSymptomsSymptoms,
            diagnosis: appointmentSymptomsDiagnosis
        }],
        observations
    });

    try {
        await record.save();
        return new Response('Record created', { status: 201 });
    } catch (error) {
        console.error("Error: ", error);
        return new Response('Error creating record', { status: 500 });
    }
}
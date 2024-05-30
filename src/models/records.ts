import { Schema, model, models } from 'mongoose';

const recordSchema = new Schema({
    doctorEmail: { type: String, required: true },
    patientEmail: { type: String, required: true },
    date: { type: Date, default: Date.now },
    doctor: {
        name: { type: String, required: true },
        license: { type: String, required: true },
        speciality: { type: [String], required: true },
        phone: { type: String, required: true }
    },
    patient: {
        name: { type: String, required: true },
        age: { type: Number, required: true },
        dateOfBirth: { type: Date },
        address: { type: String }
    },
    Sings: [{
        bloodPressure: { type: String, required: true },
        heartRate: { type: String, required: true },
        weight: { type: String, required: true },
        height: { type: String, required: true },
    }],
    history: [{
        chronicDiseases: { type: String, required: true },
        surgeries: { type: String, required: true },
        allergies: { type: String, required: true },
        medications: { type: String, required: true },
    }],
    appointmentSymptoms: [{
        symptoms: { type: String, required: true },
        diagnosis: { type: String, required: true },
    }],
    observations: { type: String, required: true },
})

const Record = models.Record || model('Record', recordSchema);

export default Record;
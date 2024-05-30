import { Schema, model, models } from 'mongoose';

const prescriptionSchema = new Schema({
    doctorEmail: { type: String, required: true },
    patientEmail: { type: String, required: true },
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
    date: { type: Date, default: Date.now },
    treatment: [{
        medicationName: { type: String, required: true },
        dosage: { type: String, required: true },
        routeOfAdministration: { type: String, required: true },
        frequency: { type: String, required: true },
        duration: { type: String, required: true },
        additionalInstructions: { type: String }
    }],
    doctorInstructions: { type: String },
    doctorSignature: { type: String, required: true },
    controlledSubstance: {
        folioNumber: { type: String },
        barcode: { type: String }
    }
});

const Prescription = models.Prescription || model('Prescription', prescriptionSchema);

export default Prescription;
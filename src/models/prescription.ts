import { Schema, model, models } from 'mongoose';

const prescriptionSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    doctor: {
        type: String,
        required: true
    },
    specialty: {
        type: [String],
        required: true
    },
});

const Prescription = models.Prescription || model('Prescription', prescriptionSchema);

export default Prescription;
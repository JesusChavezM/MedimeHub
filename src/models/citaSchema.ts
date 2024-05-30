import { Schema, model, models } from 'mongoose';

const citaSchema = new Schema({
  doctorName: {
    type: String,
    required: true,
  },
  doctorEmail: {
    type: String,
    required: true,
  },
  pacientName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  speciality: {
    type: [String],
    required: true
  },
  appointmentDate: {
    type: Date,
    required: true,
  },
  status: {
    type: Number,
    enum: [0, 1], // 0: En proceso, 1: Finalizado
    required: true,
    default: 0,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
});

const Cita = models.Cita || model('Cita', citaSchema);

export default Cita;

import { Schema, model, models } from 'mongoose';

const citaSchema = new Schema({
  doctorName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  appointmentDate: {
    type: Date,
    required: true,
  },
});

const Cita = models.Cita || model('Cita', citaSchema);

export default Cita;

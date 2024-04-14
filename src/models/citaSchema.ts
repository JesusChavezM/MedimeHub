import { Schema, model, models } from 'mongoose';

const citaSchema = new Schema({
  fechaHora: {
    type: Date,
    required: true
  },
  duracionEstimada: {
    type: Number,
    required: true
  },
  tipo: {
    type: String,
    enum: ['consulta', 'revisión', 'procedimiento'],
    required: true
  },
  medicoAsignado: {
    type: String,
    required: true
  },
  motivo: {
    type: String,
    required: true
  },
  estado: {
    type: String,
    enum: ['programada', 'confirmada', 'cancelada', 'completada'],
    default: 'programada'
  }
});

const Cita = models.Cita || model('Cita', citaSchema);

export default Cita;

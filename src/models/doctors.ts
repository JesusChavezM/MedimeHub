import  { Schema, model, models } from 'mongoose';

const DoctorSchema = new Schema({
    license: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    speciality: {
        type: [String],
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    clinic: {
        type: String,
        required: true
    },
    hospital: {
        type: String,
        required: true
    },
});
  
const Doctor = models.Doctor || model('Doctor', DoctorSchema);

export default Doctor;
import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    gender: {
        type: String,
        required: [true, 'Gender is required']
    },
    birthdate: {
        type: String,
        required: [true, 'Birthdate is required']
    },
    phone: {
        type: String,
        required: [true, 'Phone is required']
    },
    address: {
        type: String,
        required: [true, 'Address is required']
    },
    state: {
        type: String,
        required: [true, 'State is required']
    },
    country: {
        type: String,
        required: [true, 'Country is required']
    },
    zipCode: {
        type: String,
        required: [true, 'ZipCode is required']
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'doctor'],
        default: 'user',
        required: [true, 'Role is required']
    },
    license: {
        type: String,
        required: function () { return this.role === 'doctor'; }
    },
    speciality: {
        type: [String],
        required: function () { return this.role === 'doctor'; }
    },
    clinic: {
        type: String,
        required: function () { return this.role === 'doctor'; }
    },
    hospital: {
        type: String,
        required: function () { return this.role === 'doctor'; }
    },
    adminemail: {
        type: String,
        required: function () { return this.role === 'admin'; }
    }
}, { timestamps: true });

const User = models.User || model('User', userSchema);
export default User;

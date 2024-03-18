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
        required: true,
        minLenght: [3, 'Name must be at least 3 characters long'],
        maxLenght: [50, 'Name must be at most 50 characters long']
    }
});

const User = models.User || model('User', userSchema);
export default User;
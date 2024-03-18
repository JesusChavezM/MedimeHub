import mongoose from 'mongoose';

const { MONGO_URI } = process.env;

if (!MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
}

export const connectDB = async () => {
    try{
        const { connection } = await mongoose.connect(MONGO_URI);
        if (connection.readyState === 1) {
            console.log('Connected to MongoDB');
            return Promise.resolve(true);
        }
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        return Promise.reject(false);
    }
};


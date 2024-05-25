import { Schema, model, models } from 'mongoose';

const LocationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    }
});

const Location = models.Location || model('Location', LocationSchema);

export default Location;
import mongoose from 'mongoose';
import { User } from '../entities/User';
import { Event } from '../entities/Events';

const eventSchema = new mongoose.Schema({
    title: String,
    location: {
        latitude: String,
        longitude: String
    },
    date: Date,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    description: String,
    categories: [String],
    banner: String,
    flyers: [String],
    price: {
        type: Array
    },
    city: String,
    participantes: {
        type: Array,
        ref: User
    }
});
const EventModel = mongoose.model('Event', eventSchema);
class EventRepositoryMongoose {
    async add(event: Event): Promise<Event> {
        const eventModel = new EventModel(event);
        await eventModel.save();
        return event
    }
}

export { EventRepositoryMongoose }
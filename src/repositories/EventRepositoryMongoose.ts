import mongoose from 'mongoose';
import { User } from '../entities/User';
import { Event } from '../entities/Events';
import { Location } from '../entities/Location';

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

    async findByLocationAndDate(location: Location, date: Date): Promise<Event | undefined> {
        const findEvent = await EventModel.findOne({ location, date }).exec()
        return findEvent ? findEvent.toObject() : undefined;
    }
    async findEventsByCity(city: string): Promise<Event[]> {
        const findEvent = await EventModel.find({ city }).exec()
        return findEvent.map(event => event.toObject());
    }
    async findEventsByCategory(category: string): Promise<Event[]> {
        const findEvent = await EventModel.find({ categories: category }).exec()
        return findEvent.map(event => event.toObject());
    }
}

export { EventRepositoryMongoose }
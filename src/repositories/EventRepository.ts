import { Event } from "../entities/Events"
import { Location } from "../entities/Location"
import { User } from "../entities/User"

interface EventRepository {
    add(event: Event): Promise<Event>
    findByLocationAndDate(location: Location, date: Date): Promise<Event | undefined>
    findEventsByCity(city: string): Promise<Event[]>
    findEventsByCategory(category: string): Promise<Event[]>
    findEventsByName(name: string): Promise<Event[]>
    findEventById(id: string): Promise<Event | undefined>
    updateEvent(event: Event, id: string): Promise<any>
}
export { EventRepository }
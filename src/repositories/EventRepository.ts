import { Event } from "../entities/Events"

interface EventRepository {
    add(event: Event): Promise<Event>
}
export { EventRepository }
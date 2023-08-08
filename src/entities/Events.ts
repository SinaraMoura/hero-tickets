import { Location } from "./Location";
import { Price } from "./Price";
import { User } from "./User";

class Event {
    constructor(
        public title: string,
        public date: Date,
        public description: string,
        public location: Location,
        public banner: string,
        public coupuns: string[],
        public participants: User[],
        public price: Price[],
        public city: string
    ) { }
}
export { Event }
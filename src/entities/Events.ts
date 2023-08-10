import { Location } from "./Location";
import { Price } from "./Price";
import { User } from "./User";

class Event {
    constructor(
        public title: string,
        public date: Date,
        public description: string,
        public location: Location,
        public flyers: string[],
        public banner: string,
        public coupons: string[],
        public participantes: User[],
        public price: Price[],
        public city: string,
        public categories: string[]
    ) { }
}
export { Event }
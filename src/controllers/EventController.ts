import { NextFunction, Request, Response } from "express";
import { EventUseCase } from "../useCases/EventUseCase";
import { Event } from "../entities/Events";

class EventController {
    constructor(private eventUseCase: EventUseCase) { }

    async create(req: Request, res: Response, next: NextFunction) {
        let eventData: Event = req.body;
        const files = req.files as any;

        if (files) {
            const banner = files.banner[0];
            const flyers = files.flyers;

            eventData = {
                ...eventData,
                banner: banner.filename,
                flyers: flyers.map((flye: any) => flye.filename)
            }
        }

        try {
            await this.eventUseCase.create(eventData);
            return res.status(201).json({ message: 'Evento criado com sucesso' });
        } catch (error) {
            next(error);
        }
    }

    async findEventByLocation(req: Request, res: Response, next: NextFunction) {

        const { latitude, longitude } = req.query;
        try {
            const events = await this.eventUseCase.findEventByLocation(
                String(latitude),
                String(longitude)
            );
            return res.status(200).json(events);
        } catch (error) {
            next(error)
        }
    }
    async findEventByCategory(req: Request, res: Response, next: NextFunction) {
        const { category } = req.params;
        try {
            const eventCategory = await this.eventUseCase.findEventByCategory(
                String(category)
            );
            console.log("🚀 ~ file: EventController.ts:50 ~ EventController ~ findEventByCategory ~ eventCategory:", eventCategory)
            return res.status(200).json(eventCategory);
        } catch (error) {
            next(error)
        }
    }
}
export { EventController }
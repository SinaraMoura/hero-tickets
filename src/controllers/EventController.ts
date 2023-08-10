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
        console.log(
            '🚀 ~ file: EventController.ts:54 ~ EventController ~ category:',
            category,
        );
        try {
            const events = await this.eventUseCase.findEventByCategory(
                String(category),
            );
            return res.status(200).json(events);
        } catch (error) {
            next(error);
        }
    }
    async findEventByName(req: Request, res: Response, next: NextFunction) {
        const { name } = req.query;
        try {
            const events = await this.eventUseCase.findEventByName(
                String(name)
            );
            console.log("🚀 ~ file: EventController.ts:50 ~ EventController ~ findEventByCategory ~ eventCategory:", events)
            return res.status(200).json(events);
        } catch (error) {
            next(error)
        }
    }
    async findEventsById(
        request: Request,
        response: Response,
        next: NextFunction,
    ) {
        const { id } = request.params;

        try {
            const events = await this.eventUseCase.findEventById(String(id));
            return response.status(200).json(events);
        } catch (error) {
            next(error);
        }
    }
    async addParticipant(
        request: Request,
        response: Response,
        next: NextFunction,
    ) {
        const { name, email } = request.body;
        const { id } = request.params;

        try {
            const events = await this.eventUseCase.addParticipant(id, name, email);
            return response.status(200).json(events);
        } catch (error) {
            next(error);
        }
    }
}
export { EventController }
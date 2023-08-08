import { NextFunction, Request, Response } from "express";
import { EventUseCase } from "../useCases/EventUseCase";

class EventController {
    constructor(private eventUseCase: EventUseCase) { }

    async create(req: Request, res: Response, next: NextFunction) {
        const eventData = req.body;

        try {
            await this.eventUseCase.create(eventData);
            return res.status(201).json({ message: 'Evento criado com sucesso' });
        } catch (error) {
            next(error);
        }
    }
}
export { EventController }
import crypto from 'node:crypto';
import request from 'supertest';
import { App } from '../app';
import { Event } from '../entities/Event';
import { EventUseCase } from '../useCases/EventUseCase';
const app = new App();
const express = app.app;
describe('Event test', () => {
    it('/POST Event', async () => {
        const event = {
            title: '`Pic Nick no Parque',
            price: [{ sector: 'Pista', amount: '0' }],
            categories: ['Festival'],
            description: 'Evento descrição',
            city: 'Brasília',
            location: {
                latitude: '-19.8658659',
                longitude: '-43.9737064',
            },
            coupons: [],
            date: new Date('2023-08-30'),
            participants: [],
        };

        const response = await request(express)
            .post('/events')
            .field('title', event.title)
            .field('description', event.description)
            .field('city', event.city)
            .field('coupons', event.coupons)
            .field('categories', event.categories)
            .field('location[latitude]', event.location.latitude)
            .field('location[longitude]', event.location.longitude)
            .field('date', event.date.toISOString())
            .field('price[sector]', event.price[0].sector)
            .field('price[amount]', event.price[0].amount)
            .attach('banner', '/Users/Sinara/Downloads/banner.png')
            .attach('flyers', '/Users/Sinara/Downloads/flyers.png')

        if (response.error) {
            console.log('🚀 ~ file: Events.test.ts:34 ~ it ~ error:', response.error);
        }

        expect(response.status).toBe(201);
        expect(response.body).toEqual({ message: 'Evento criado com sucesso.' });
    }, 1000000);
    it('/GET/:id  event by id', async () => {
        const response = await request(express).get(
            '/events/64d7de34553b7fc3426423f5',
        );

        if (response.error) {
            console.log('🚀 ~ file: Events.test.ts:34 ~ it ~ error:', response.error);
        }

        expect(response.status).toBe(200);
    });
    it('/GET  event by location', async () => {
        const response = await request(express).get(
            '/events?latitude=-19.8658659&longitude=-43.9737064',
        );

        if (response.error) {
            console.log('🚀 ~ file: Events.test.ts:34 ~ it ~ error:', response.error);
        }

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });
    it('/GET  event by category', async () => {
        const response = await request(express).get('/events/category/Show');

        if (response.error) {
            console.log('🚀 ~ file: Events.test.ts:34 ~ it ~ error:', response.error);
        }

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });
    it('/GET  all event ', async () => {
        const response = await request(express).get('/events/main');
        console.log("🚀 ~ file: Events.test.ts:82 ~ it ~ response[events/main]:", response.body);

        if (response.error) {
            console.log('🚀 ~ file: Events.test.ts:34 ~ it ~ error:', response.error);
        }

        expect(response.status).toBe(200);
        // expect(response.body.length).toBeGreaterThan(0);
    });
    it('/POST  event insert user', async () => {
        const response = await request(express)
            .post('/events/64d7de34553b7fc3426423f5/participants')
            .send({
                name: 'Sinara',
                email: crypto.randomBytes(10).toString('hex') + '@teste.com',
            });

        if (response.error) {
            console.log('🚀 ~ file: Events.test.ts:34 ~ it ~ error:', response.error);
        }

        expect(response.status).toBe(200);
    });
});
const eventRepository = {
    add: jest.fn(),
    findEventsByCategory: jest.fn(),
    findByLocationAndDate: jest.fn(),
    findEventsByCity: jest.fn(),
    findEventsByName: jest.fn(),
    findEventById: jest.fn(),
    update: jest.fn(),
    findEventsMain: jest.fn(),
    findEventsByFilter: jest.fn()

};
const eventUseCase = new EventUseCase(eventRepository);
const event: Event = {
    title: 'Ana Castela',
    price: [{ sector: 'Pista', amount: '50' }],
    categories: ['Show'],
    formattedAddress: '',
    description: 'Evento descrição',
    city: 'Brasília',
    location: {
        latitude: '-19.8658859',
        longitude: '-43.1737064',
    },
    banner: 'banner.png',
    flyers: ['flyer1.png', 'flyer2.png'],
    coupons: [],
    date: new Date(),
    participants: [],
};
describe('Unit Test', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should return an array of events by category', async () => {
        eventRepository.findEventsByCategory.mockResolvedValue([event]);
        const result = await eventUseCase.findEventsByCategory('Show');

        expect(result).toEqual([event]);
        expect(eventRepository.findEventsByCategory).toHaveBeenCalledWith('Show');
    });
    it('should return an array of events by name', async () => {
        eventRepository.findEventsByName.mockResolvedValue([event]);
        const result = await eventUseCase.findEventsByName('"Zé Neto e Cristiano');

        expect(result).toEqual([event]);
        expect(eventRepository.findEventsByName).toHaveBeenCalledWith(
            '"Zé Neto e Cristiano',
        );
    });
    it('should return a event by Id', async () => {
        eventRepository.findEventById.mockResolvedValueOnce(event);
        const result = await eventUseCase.findEventsById(
            '64d7de34553b7fc3426423f5',
        );

        expect(result).toEqual(event);
        expect(eventRepository.findEventById).toHaveBeenCalledWith(
            '64d7de34553b7fc3426423f5',
        );
    });
    it('should return all events', async () => {
        eventRepository.findEventsMain.mockResolvedValue([event]);
        const result = await eventUseCase.findEventsMain();
        console.log("🚀 ~ file: Events.test.ts:159 ~ it ~ result:", result)

        expect(result).toEqual([event]);
    });
});
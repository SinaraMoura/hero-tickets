import crypto from 'node:crypto';
import { App } from "../app";
import { Event } from "../entities/Events";
import request from "supertest";
import { EventUseCase } from "../useCases/EventUseCase";

const app = new App();
const express = app.app;
describe('Event test', () => {
    it('/POST Event', async () => {
        const event = {
            title: 'Jorge e Mateus',
            price: [{ sector: 'Pista', amount: '20' }],
            categories: ['Show'],
            description: 'Evento descrição',
            city: 'Belo Horizonte',
            location: {
                latitude: '-19.8658659',
                longitude: '-43.9737064',
            },
            coupons: [],
            date: new Date(),
            participantes: [],
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
        expect(response.body).toEqual({ message: 'Evento criado com sucesso' });
    }, 10000000);

    it('/GET/:id  event by id', async () => {
        const response = await request(express).get(
            '/events/64d3f20eb5d13162be588c8d',
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

    it('/GET/category/:category  event by category', async () => {
        const response = await request(express).get(
            '/events/category/Show',
        );

        if (response.error) {
            console.log('🚀 ~ file: Events.test.ts:34 ~ it ~ error:', response.error);
        }

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('/POST  event insert user', async () => {
        const response = await request(express)
            .post('/events/64d3f20eb5d13162be588c8d/participants')
            .send({
                name: 'Sinara',
                email: crypto.randomBytes(10).toString('hex') + '@teste.com',
            });

        if (response.error) {
            console.log('🚀 ~ file: Events.test.ts:34 ~ it ~ error:', response.error);
        }

        expect(response.status).toBe(200);
    });

})

const eventRepository = {
    add: jest.fn(),
    findByLocationAndDate: jest.fn(),
    findEventsByCity: jest.fn(),
    findEventsByCategory: jest.fn(),
    findEventsByName: jest.fn(),
    findEventById: jest.fn(),
    updateEvent: jest.fn()
}
const eventUseCase = new EventUseCase(eventRepository);

const event: Event = {
    title: 'Jorge e Mateus',
    price: [{ sector: 'Pista', amount: '20' }],
    categories: ['Show'],
    description: 'Evento descrição',
    city: 'Belo Horizonte',
    location: {
        latitude: '-19.8658659',
        longitude: '-43.9737064',
    },
    coupons: [],
    date: new Date(),
    participantes: [],
    flyers: ['flyers.png'],
    banner: 'banner.png'

};
describe('Unit Test ', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should return an array of events by category', async () => {
        eventRepository.findEventsByCategory.mockResolvedValue([event])
        const result = await eventUseCase.findEventByCategory('Show');

        expect(result).toEqual([event])
        expect(eventRepository.findEventsByCategory).toHaveBeenCalledWith('Show');
    })

    it('should return an array of events by name', async () => {
        eventRepository.findEventsByName.mockResolvedValue([event])
        const result = await eventUseCase.findEventByName('Jorge e Mateus');
        console.log("🚀 ~ file: Events.test.ts:93 ~ it ~ result:", result)

        expect(result).toEqual([event])
        expect(eventRepository.findEventsByName).toHaveBeenCalledWith('Jorge e Mateus');
    })

    it('should return an array of events by id', async () => {
        eventRepository.findEventById.mockResolvedValueOnce(event)
        const result = await eventUseCase.findEventById('64d3f20eb5d13162be588c8d');
        console.log("🚀 ~ file: Events.test.ts:93 ~ it ~ result:", result)

        expect(result).toEqual(event)
        expect(eventRepository.findEventById).toHaveBeenCalledWith('64d3f20eb5d13162be588c8d');
    })
})
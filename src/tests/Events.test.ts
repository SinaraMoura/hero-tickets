import { response } from "express";
import { App } from "../app";
import { Event } from "../entities/Events";
import request from "supertest";

const app = new App().app
describe('Event test', () => {
    it('/POST', async () => {
        const event = {
            title: 'Rio negro e Solimões',
            price: [{
                sector: 'pista',
                amount: '20'
            }],
            categories: ['Show'],
            description: 'Evento descrição',
            city: 'Rajadinha',
            location: { latitude: '-15.7439956', longitude: '-47.694827' },
            coupons: [],
            date: new Date(),
            participants: [],

        };
        const response = await request(app)
            .post('/events')
            .field('title', event.title)
            .field('description', event.description)
            .field('categories', event.categories)
            .field('city', event.city)
            .field('date', event.date.toISOString())
            .field('participants', event.participants)
            .field('coupons', event.coupons)
            .field('location[latitude]', event.location.latitude)
            .field('location[longitude]', event.location.longitude)
            .field('price[amount]', event.price[0].amount)
            .field('price[sector]', event.price[0].sector)
            .attach("banner", '/Users/Sinara/Downloads/banner.png')
            .attach("flyers", '/Users/Sinara/Downloads/flyers.png')
        if (response.error) {
            console.log("🚀 ~ file: Events.test.ts:37 ~ it ~ error:", response.error)

        }
        expect(response.status).toBe(201);
        expect(response.body).toEqual({ message: 'Evento criado com sucesso' })
    }, 100000)

})
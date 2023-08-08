import mongoose from 'mongoose';

export async function connect() {
    try {
        await mongoose.connect('mongodb+srv://herotickets:e6woEZ839mahSJ6f@cluster0.agncpdt.mongodb.net/hero-tickets');
        console.log('Connect database success');

    } catch (error) {
        console.log("~ file: database.ts:5 ~ connect ~ error:", error);
    }
}
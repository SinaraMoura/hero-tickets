import mongoose from 'mongoose';

export async function connect() {
    try {
        await mongoose.connect('mongodb+srv://herotickets:8Zt14s0G9T1r11I2@cluster0.agncpdt.mongodb.net/hero-tickets');
    } catch (error) {
        console.log("🚀 ~ file: database.ts:9 ~ connect ~ error:", error)
    }
}
// src/db/mongo.ts
import mongoose from 'mongoose';


export const connectToDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/stream_video', {
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
};

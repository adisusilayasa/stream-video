// src/db/mongo.ts
import mongoose from 'mongoose';


export const connectToDB = async () => {
    try {
        await mongoose.connect(String(process.env.MONGODB_URI), {
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
};

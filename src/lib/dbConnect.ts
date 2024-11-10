import mongoose from 'mongoose';
import { mydbName } from './dbName';

type ConnectionObject = {
    isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log("You are already connected to the database");
        return;
    }

    const mongoUri = `${process.env.MONGODB_URI}/${mydbName}`;
    if (!mongoUri) {
        console.error("MONGODB_URI is not defined in the environment variables");
        process.exit(1);
    }

    try {
        const db = await mongoose.connect(mongoUri);
        connection.isConnected = db.connections[0].readyState;
        console.log("Connected to database",mydbName);
    } catch (error) {
        console.error("Database connection failed. Please try again.", error);
        process.exit(1);
    }
}

export default dbConnect;

import mongoose from 'mongoose';
import { mydbName } from './dbName';

type connectionObject ={
    isConnected?: number
}

const connection:connectionObject = {};

async function dbConnect():Promise<void>
{
    if(connection.isConnected)
    {
        console.log("You are already connected to database");
        return
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || "",{});
        connection.isConnected = db.connections[0].readyState
        console.log("Connected to database");
    } catch (error) {
        console.log("Database connection failed \ntry again");
        process.exit(1);
    }
}

export default dbConnect;

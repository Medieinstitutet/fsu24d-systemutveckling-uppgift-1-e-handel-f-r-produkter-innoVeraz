import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI as string;
if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = (global as any).mongoose;
if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectMongo() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const options = {
      dbName: 'dbwebbshop',
      // Uupdated to use the new MongoDB driver options
      ssl: true,
      tls: true,
      tlsInsecure: true, // remove in production
    };

    cached.promise = mongoose.connect(MONGODB_URI, options)
      .then((mongoose) => mongoose);
  }
  
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectMongo;

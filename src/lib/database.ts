import mongoose from 'mongoose';
import { MongoClient, MongoClientOptions } from 'mongodb';
import dotenv from 'dotenv';

// Load environment variables if needed
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

// MongoDB Client setup (for raw MongoDB operations)
interface MongoGlobal {
  mongoClientPromise?: Promise<MongoClient>;
}

const mongoGlobal = globalThis as unknown as MongoGlobal;

if (!mongoGlobal.mongoClientPromise) {
  const client = new MongoClient(MONGODB_URI, {} as MongoClientOptions);
  mongoGlobal.mongoClientPromise = client.connect();
}

export const clientPromise = mongoGlobal.mongoClientPromise!;

// Mongoose setup (for schema-based models)
interface MongooseGlobal {
  mongoose?: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  }
}

const mongooseGlobal = global as unknown as MongooseGlobal;

if (!mongooseGlobal.mongoose) {
  mongooseGlobal.mongoose = { conn: null, promise: null };
}

export async function connectMongo() {
  if (mongooseGlobal.mongoose?.conn) {
    return mongooseGlobal.mongoose.conn;
  }

  if (!mongooseGlobal.mongoose?.promise) {
    mongooseGlobal.mongoose!.promise = mongoose.connect(MONGODB_URI, {
      dbName: 'dbwebbshop',
    }).then((mongoose) => mongoose);
  }

  mongooseGlobal.mongoose!.conn = await mongooseGlobal.mongoose!.promise;
  return mongooseGlobal.mongoose!.conn;
}

// Export default for backwards compatibility
export default connectMongo;
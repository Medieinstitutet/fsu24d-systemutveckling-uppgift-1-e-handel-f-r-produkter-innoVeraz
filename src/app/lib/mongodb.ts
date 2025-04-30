import { MongoClient, MongoClientOptions } from 'mongodb';

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local');
}

const options: MongoClientOptions = {};

const globalForMongo = globalThis as unknown as { mongoClientPromise?: Promise<MongoClient> };

if (!globalForMongo.mongoClientPromise) {
  const client = new MongoClient(uri, options);
  globalForMongo.mongoClientPromise = client.connect();
}

const clientPromise = globalForMongo.mongoClientPromise!;

export default clientPromise;

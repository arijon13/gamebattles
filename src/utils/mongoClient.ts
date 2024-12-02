import { MongoClient, ServerApiVersion, Db } from "mongodb";

const uri = process.env.MONGO_URI;
const DB_NAME = "auth-backend";

if (!uri) {
  throw new Error("MONGO_URI is missing in the environment variables");
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let isConnected = false;
let db: Db | null = null;

export async function connectToMongo() {
  if (!isConnected) {
    try {
      await client.connect();
      db = client.db(DB_NAME);
      console.log("Connected to MongoDB successfully!");
      isConnected = true;
    } catch (error) {
      console.error("Failed to connect to MongoDB:", error);
      throw error;
    }
  }
  return client;
}

export function getDatabase() {
  if (!isConnected || !db) {
    throw new Error("MongoDB is not connected");
  }
  return db;
}
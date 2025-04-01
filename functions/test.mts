import type { Context } from "@netlify/functions";
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URL;
if (!uri) {
  throw new Error("MONGODB_URL is not defined in the environment variables.");
}
const mongoClient = new MongoClient(uri);

export const handler = async (event: any, context: Context) => {
  const clientPromise = await mongoClient.connect();
  const database = (await clientPromise).db("Blog");
  const collection = database.collection("Posts");
  const cursor = collection.find();
  const data = await cursor.toArray();
  let neki = event.queryStringParameters; 
  return {
    statusCode: 200,
    body: "Hello, world!" + JSON.stringify(data),
  };
};
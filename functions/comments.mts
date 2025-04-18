import { MongoClient } from 'mongodb';
import { Context } from "@netlify/functions";

require('dotenv').config();

const uri = process.env.MONGODB_URL;
if (!uri) {
  throw new Error("MONGODB_URL is not defined in the environment variables.");
}
const mongoClient = new MongoClient(uri);

export const handler = async (event: any, context: Context) => {
  if (event.httpMethod == "GET") {
    const clientPromise = await mongoClient.connect();
    try {
      const database = (await clientPromise).db("Blog");
      const collection = database.collection("Comments");
      // get postid parameter
      let postId = event.queryStringParameters.postId;
      const cursor = collection.find({postId: parseInt(postId)});
      const data = await cursor.toArray();
      return {
        statusCode: 200,
        Headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
          "Access-Control-Allow-Headers": "*"
        },
        body: JSON.stringify(data)
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify(error)
      }
    } finally {
      (await clientPromise).close();
    }
  } else if (event.httpMethod == "POST") {
    const clientPromise = await mongoClient.connect();
    let reqData = JSON.parse(event.body);
    try {
      const database = (await clientPromise).db("Blog");
      const collection = database.collection("Comments");

      let comment = await collection.insertOne(reqData);
      return {
        statusCode: 200,
        Headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
          "Access-Control-Allow-Headers": "*"
        },
        body: JSON.stringify(comment)
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify(error)
      }
    } finally {
      (await clientPromise).close();
    }
  } else {
    console.log("Else request");
    return {
      statusCode: 405,
      Headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*"
      },
      body: "Method not allowed"
    }
  }
}
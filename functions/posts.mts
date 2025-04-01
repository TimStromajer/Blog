import { MongoClient, ObjectId } from 'mongodb';
import { Context } from "@netlify/functions";
import { Console } from 'console';

console.log("Starting posts function");

require('dotenv').config();

const uri = process.env.MONGODB_URL;
if (!uri) {
  throw new Error("MONGODB_URL is not defined in the environment variables.");
}
const mongoClient = new MongoClient(uri);

export const handler = async (event: any, context: Context) => {
  console.log("starting posts function");
  if (event.httpMethod == "GET") {
    console.log("GET post");
    const clientPromise = await mongoClient.connect();
    console.log("mongo connected");
    try {
      const database = (await clientPromise).db("Blog");
      const collection = database.collection("Posts");
      console.log("db connected");

      if (event.queryStringParameters.postId != null) {
        let postId = event.queryStringParameters.postId;
        const cursor = collection.findOne({ _id: new ObjectId(postId) });
        console.log("mongo found");
        const data = await cursor;
        return {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "*"
          },
          body: JSON.stringify(data)
        }
      } else {
        const cursor = collection.find();
        const data = await cursor.toArray();
        return {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "*"
          },
          body: JSON.stringify(data)
        }
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
    reqData._id = null;
    try {
      const database = (await clientPromise).db("Blog");
      const collection = database.collection("Posts");

      let post = await collection.insertOne(reqData);
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
          "Access-Control-Allow-Headers": "*"
        },
        body: JSON.stringify(post)
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify(error)
      }
    } finally {
      (await clientPromise).close();
    }
  } else if (event.httpMethod == "PUT") {
    const clientPromise = await mongoClient.connect();
    try {
      const database = (await clientPromise).db("Blog");
      const collection = database.collection("Posts");

      let postId = event.queryStringParameters.postId;
      let post = await collection.updateOne({ _id: new ObjectId(postId) }, { $inc: { likes: 1 } });
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
          "Access-Control-Allow-Headers": "*"
        },
        body: JSON.stringify(post)
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
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*"
      },
      body: ""
    }
  }
}
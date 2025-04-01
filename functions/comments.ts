import { MongoClient } from 'mongodb';
require ('dotenv').config();

const uri = process.env.MONGO_URI;
const mongoClient = new MongoClient(uri);

export async function handler(event, context) {
  if (event.httpMethod == "GET") {
    const clientPromise = await mongoClient.connect();
    try {
      const database = (await clientPromise).db("blog");
      const collection = database.collection("comments");
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
      const database = (await clientPromise).db("blog");
      const collection = database.collection("comments");

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
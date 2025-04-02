import { Context } from "@netlify/functions";

export const handler = async (event: any, context: Context) => {
  if (event.httpMethod == "GET") {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Hello World!" })
    };
  } else if (event.httpMethod == "POST") {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Hello POST World!" })
    };
  }
}
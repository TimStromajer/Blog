import type { Context } from "@netlify/functions";

export const handler = async (event: any, context: Context) => {
  let neki = event.queryStringParameters; 
  return {
    statusCode: 200,
    body: "Hello, world!" + JSON.stringify(neki),
  };
};
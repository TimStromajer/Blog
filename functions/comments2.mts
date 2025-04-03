import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, query, where } from "firebase/firestore";
import { Context } from "@netlify/functions";

require('dotenv').config();

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "blog-e0594.firebaseapp.com",
  projectId: "blog-e0594",
  storageBucket: "blog-e0594.firebasestorage.app",
  messagingSenderId: "363834759771",
  appId: "1:363834759771:web:6e5ffa590cd471024ebd7e",
  measurementId: "G-R41LBM9RD9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const handler = async (event: any, context: Context) => {
  if (event.httpMethod === "GET") {
    try {
      const postId = event.queryStringParameters?.postId;

      let commentsQuery;
      if (postId) {
        // Query Firestore for comments with the given postId
        commentsQuery = query(collection(db, "Comments"), where("postId", "==", postId));
      } else {
        // Query Firestore for all comments
        commentsQuery = collection(db, "Comments");
      }

      const snapshot = await getDocs(commentsQuery);

      // Map the documents to an array of data
      const comments = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST",
          "Access-Control-Allow-Headers": "Content-Type"
        },
        body: JSON.stringify(comments)
      };
    } catch (error) {
      console.error("Error fetching comments:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to fetch comments" })
      };
    }
  } else if (event.httpMethod === "POST") {
    try {
      const reqData = JSON.parse(event.body || "{}");

      // remove column id from reqData
      delete reqData.id;

      // Add a new comment to Firestore
      const docRef = await addDoc(collection(db, "Comments"), reqData);

      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST",
          "Access-Control-Allow-Headers": "Content-Type"
        },
        body: JSON.stringify({ id: docRef.id, ...reqData })
      };
    } catch (error) {
      console.error("Error adding comment:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to add comment" })
      };
    }
  } else {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*"
      },
      body: JSON.stringify("")
    };
  }
};
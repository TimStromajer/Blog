import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, doc, updateDoc, query, where, increment, getDoc } from "firebase/firestore";import { Context } from "@netlify/functions";

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

      if (postId) {
        // Fetch a single post by postId
        // const postRef = doc(db, "Posts", postId);
        // const snapshot = await getDocs(query(collection(db, "Posts"), where("id", "==", postId)));

        const docRef = doc(db, "Posts", postId); // Reference to the document
        const snapshot = await getDoc(docRef);
        let post = snapshot.data();
        post.id = snapshot.id; // Add the document ID to the post object

        return {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "*"
          },
          body: JSON.stringify(post)
        };
      } else {
        // Fetch all posts
        const postsCollection = collection(db, "Posts");
        const snapshot = await getDocs(postsCollection);

        const posts = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        return {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT",
            "Access-Control-Allow-Headers": "Content-Type"
          },
          body: JSON.stringify(posts)
        };
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to fetch posts" })
      };
    }
  } else if (event.httpMethod === "POST") {
    try {
      const reqData = JSON.parse(event.body || "{}");
      // remove column id from reqData
      delete reqData.id;

      // Add a new post to Firestore
      const docRef = await addDoc(collection(db, "Posts"), reqData);

      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
          "Access-Control-Allow-Headers": "*"
        },
        body: JSON.stringify({ id: docRef.id, ...reqData })
      };
    } catch (error) {
      console.error("Error adding post:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to add post" })
      };
    }
  } else if (event.httpMethod === "PUT") {
    try {
      const postId = event.queryStringParameters?.postId;

      if (!postId) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: "Missing postId parameter" })
        };
      }

      // Increment the likes for the specified post
      const postRef = doc(db, "Posts", postId);
      await updateDoc(postRef, {
        likes: increment(1) // Increment the "likes" field by 1
      });

      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
          "Access-Control-Allow-Headers": "*"
        },
        body: JSON.stringify({ message: "Post updated successfully" })
      };
    } catch (error) {
      console.error("Error updating post:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to update post" })
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
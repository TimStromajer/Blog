import { getPosts, getComments } from "../database/dbService";
import { postsData, commentsData } from "../database/database"; 

export async function load() {
  console.log("Loading posts...");
  try {
    const posts = await getPosts();
    const comments = await getComments(undefined);

    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return {
      posts: posts,
      comments: comments
    };
  } catch (error) {
    console.error("Error loading posts:", error);
    return {
      posts: [],
      comments: []
    };
  }
}
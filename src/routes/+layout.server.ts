import { getPosts, getComments } from "../database/dbService";
import { postsData, commentsData } from "../database/database"; 

export async function load() {
  console.log("Loading posts...");
  const posts = await getPosts();
  const comments = await getComments(undefined);
  return {
    posts: posts,
    comments: comments
  };
}
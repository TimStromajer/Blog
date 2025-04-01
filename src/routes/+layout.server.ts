import { getPosts, getComments } from "../database/dbService";
import { postsData, commentsData } from "../database/database"; 

export function load() {
  console.log("Loading posts...");
  const posts = getPosts();
  const comments = getComments(undefined);
  return {
    posts: posts,
    comments: comments
  };
}
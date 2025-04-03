import { getPost, getComments } from "../../../database/dbService";

export async function load ({ params }) {
    console.log("Loading post...");
    try {
      const post = await getPost(params.slug);
      const comments = await getComments(params.slug);
      return {
        slug: params.slug,
        post: post,
        comments: comments
      };
    } catch (error) {
      console.error("Error loading posts:", error);
      return {
        slug: params.slug,
        posts: [],
        comments: []
      };
    }
}
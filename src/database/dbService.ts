import { PUBLIC_FUNCTIONS_URL } from "$env/static/public";
import { Post } from "$lib/post";
import { Comment } from "$lib/comment";

//
// POSTS
//

export async function getPosts(): Promise<Post[]> {
  let url = PUBLIC_FUNCTIONS_URL + "/posts";
  const response = await fetch(url, {
    mode: "cors"
  });
  const data: Post[] = await response.json();
  return data;
}

export async function getPost(postId: string): Promise<Post> {
  let url = PUBLIC_FUNCTIONS_URL + "/posts?postId=" + postId;
  const response = await fetch(url, {
    mode: "cors"
  });
  const data: Post = await response.json();
  return data;
}

export async function addPost(post: Post): Promise<Post> {
  let url = PUBLIC_FUNCTIONS_URL + "/posts";
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(post)
  });
  const data: Post = await response.json();
  return data;
}

//
// COMMENTS
//

export async function getComments(postId: number): Promise<Comment[]> {
  let url = PUBLIC_FUNCTIONS_URL + "/comments?postId=" + postId;
  const response = await fetch(url, {
    mode: "cors"
  });
  const data: Comment[] = await response.json();
  return data;
}

export async function addComment(comment: Comment): Promise<Comment> {
  let url = PUBLIC_FUNCTIONS_URL + "/comments";
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(comment)
  });
  const data: Comment = await response.json();
  return data;
}
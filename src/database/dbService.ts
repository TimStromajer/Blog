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
  let data: Post[];
  try {
    data = await response.json();
  }
  catch (error) {
    data = [];
    console.error("Error fetching posts:", error);
  }
  
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

export async function addLike(postId: number): Promise<Post> {
  let url = PUBLIC_FUNCTIONS_URL + "/posts?postId=" + postId;
  const response = await fetch(url, {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ like: true })
  });
  const data: Post = await response.json();
  return data;
}

//
// COMMENTS
//

export async function getComments(postId: any): Promise<Comment[]> {
  let url = PUBLIC_FUNCTIONS_URL + "/comments";
  if (postId !== undefined) {
    url += "?postId=" + postId;
  }
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
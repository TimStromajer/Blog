<script>
  // @ts-nocheck
  import { onMount } from "svelte";
  import { page } from '$app/stores';

  import { postsData } from "../../../database/database";
  import { commentsData } from "../../../database/database";
  import { Comment } from "$lib/comment";
  import { getPost, getComments, addComment } from "../../../database/dbService";

  export let data;
  let post;
  let comments;

  onMount(() => {
    getPost(data.slug).then((postData) => {
      post = postData;
    }).then(() => {
      getComments(post._id).then((commentsData) => {
        comments = commentsData;
      });
    });
  })

  // New comment form data
  let newComment = {
    user: "",
    text: ""
  };

  // Add a new comment
  function createComment() {
    if (newComment.user.trim() && newComment.text.trim()) {
      const comment = new Comment(
        comments.length + 1, // Generate a new ID
        newComment.text,
        newComment.user,
        new Date(), // Current timestamp
        post._id // Associate with the current post
      );

      addComment(comment).then(() => {
        console.log("Comment added successfully.");
        comments = [...comments, comment];
        // Reset the form
        newComment.user = "";
        newComment.text = "";
      });
    }
  }
</script>

<style>
  .post-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    background-color: #f9f9f9;
  }

  .post-card {
    width: 100%;
      max-width: 1000px;
      background-color: #fff;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      overflow: hidden;
  }

  .post-title {
      font-size: 1.8rem;
      font-weight: bold;
      padding: 1rem;
      text-align: center;
      background-color: #333;
      color: white;
  }

  .post-image {
      width: 100%;
      height: auto;
      object-fit: cover;
      max-height: 600px;
  }

  .post-content {
      padding: 1rem;
      font-size: 1rem;
      color: #555;
      line-height: 1.6;
  }

  .comments-section {
    max-width: 1000px;
    width: 100%;
  }

  .comments-section h2 {
    margin-left: 10px;
  }

  .comment-card {
      background-color: #fff;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      padding: 1rem;
      margin-bottom: 1rem;
      display: flex;
      flex-direction: column;
  }

  .comment-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
      color: #666;
  }

  .comment-name {
      font-weight: bold;
  }

  .comment-text {
      font-size: 1rem;
      color: #333;
  }

  .add-comment-section {
    max-width: 1000px;
    width: 100%;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .add-comment-section h3 {
    padding: 1rem;
    margin-bottom: 1rem;
    font-size: 1.2rem;
    color: #333;
  }

  .add-comment-section form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .add-comment-section input,
  .add-comment-section textarea {
    padding: 1rem;
    margin: 1rem;
    width: auto;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }

  .add-comment-section button {
    align-self: flex-end;
    padding: 0.5rem 1rem;
    background-color: #333;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
  }

  .add-comment-section button:hover {
    background-color: #555;
  }
</style>

<div class="post-container">
  {#if post}
    <div class="post-card">
      <h1 class="post-title">{post.title}</h1>
      <img class="post-image" src={`data:image/jpeg;base64,${post.image}`} alt={post.title} />
      <div class="post-content">
        <p>{post.text}</p>
      </div>
    </div>

    <div class="comments-section">
      <h2>Comments</h2>
      {#each comments as comment}
        <div class="comment-card">
          <div class="comment-header">
            <span class="comment-name">{comment.user}</span>
            <span class="comment-timestamp">{new Date(comment.date).toLocaleString()}</span>
          </div>
          <p class="comment-text">{comment.text}</p>
        </div>
      {/each}
    </div>

    <div class="add-comment-section">
      <h3>Add a Comment</h3>
      <form on:submit|preventDefault={createComment}>
        <input
          type="text"
          placeholder="Your Name"
          bind:value={newComment.user}
          required
        />
        <textarea
          placeholder="Your Comment"
          bind:value={newComment.text}
          rows="4"
          required
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  {:else}
    <p>Post not found.</p>
  {/if}
</div>
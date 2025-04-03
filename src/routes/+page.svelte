<script>
  // @ts-nocheck

  import { onMount } from "svelte";

  import { postsData, commentsData } from "../database/database"; 
  import { getPosts, getComments } from "../database/dbService";

  export let data;
  let blogPosts;

  blogPosts = data.posts.map((post) => {
    const commentCount = data.comments.reduce((acc, comment) => {
      if (comment.postId === post.id) {
        acc += 1;
      }
      return acc;
    }, 0);

    return {
      ...post,
      comments: commentCount
    };
  });

  /**
   * Truncate text to a maximum length and add '...' if it exceeds the limit.
   * @param {string} text - The text to truncate.
   * @param {number} maxLength - The maximum length of the text.
   * @returns {string} - The truncated text.
   */
   function truncateText(text, maxLength) {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  }

</script>

<style>
  .blog-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      padding: 1rem;
  }

  .card {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      background-color: #CEB5A7;
      height: 100%;
      max-height: 800px;
      border-radius: 8px;
  }

  .card a {
      text-decoration: none;
      color: inherit;
      height: 50%;
  }

  .card img {
      width: 100%;
      height: 100%;
      object-fit: cover;
  }

  .card-content {
      flex: 1;
      padding: 1rem;
      display: flex;
      flex-direction: column;
  }

  .card-title {
      font-size: 1.2rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
  }

  .card-date {
      font-size: 0.9rem;
      color: #888;
      margin-bottom: 0.5rem;
  }

  .card-description {
      font-size: 0.95rem;
      color: #555;
      margin-bottom: auto;
  }

  .card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 1rem;
      background-color: #CEB5A7;
      border-top: 1px solid #92828D;
      font-size: 0.9rem;
      color: #666;
  }
</style>

<div class="blog-container">
  {#each blogPosts as post}
      <div class="card">
          <a href={`/post/${post.id}`}>
              <img src={`data:image/jpeg;base64,${post.image}`} alt={post.title} />
          </a>
          <div class="card-content">
            <div>
              <a href={`/post/${post.id}`}>
                <h2 class="card-title">{post.title}</h2>
              </a>
              <p class="card-date">
                {post.user} - {new Date(post.date).toLocaleString()}
              </p>
            </div>
            <p class="card-description">{truncateText(post.text, 300)}</p>
          </div>
          <div class="card-footer">
              <span>{post.comments} Comments</span>
              <span>{post.likes} Likes</span>
          </div>
      </div>
  {/each}
</div>
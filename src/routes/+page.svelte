<script>
  // @ts-nocheck

  import { onMount } from "svelte";

  //import { postsData } from "../database/database"; 
  import { getPosts } from "../database/dbService";

  let blogPosts;

  onMount(() => {
    getPosts().then((data) => {
      blogPosts = data.sort((a, b) => new Date(b.date) - new Date(a.date));
    });
  })

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
      border: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      background-color: #fff;
      height: 100%;
      max-height: 800px;
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
      background-color: #f9f9f9;
      border-top: 1px solid #ddd;
      font-size: 0.9rem;
      color: #666;
  }
</style>

<div class="blog-container">
  {#each blogPosts as post}
      <div class="card">
          <a href={`/post/${post._id}`}>
              <img src={`data:image/jpeg;base64,${post.image}`} alt={post.title} />
          </a>
          <div class="card-content">
            <div>
              <a href={`/post/${post._id}`}>
                <h2 class="card-title">{post.title}</h2>
              </a>
              <p class="card-date">{new Date(post.date).toLocaleString()}</p>
            </div>
            <p class="card-description">{truncateText(post.text, 300)}</p>
          </div>
          <div class="card-footer">
              <span>X Comments</span>
              <span>{post.likes} Likes</span>
          </div>
      </div>
  {/each}
</div>
<script lang="ts">
  let { children } = $props();
</script>

<style>
  header {
      background-color: #333;
      color: white;
      padding: 0.2rem 1rem 0.2rem 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
  }

  nav {
      display: flex;
      gap: 1rem;
  }

  nav a {
      color: white;
      text-decoration: none;
      font-weight: bold;
      transition: color 0.3s;
  }

  nav a:hover {
      color: #ff9800;
  }

  footer {
      position: absolute;
      bottom: 0;
      width: 100%;
      text-align: center;
      background-color: #f4f4f4;
      color: #333;
      margin-top: 2rem;
      font-size: 0.9rem;
  }
</style>

<header>
  <h1>My Blog</h1>
  <nav>
      <a href="/">Home</a>
      <a href="/post">Post</a>
      <a href="/about">About</a>
  </nav>
</header>

<main>
  {@render children()}
</main>

<footer>
  <p>&copy; 2025 My Blog. All rights reserved.</p>
</footer>
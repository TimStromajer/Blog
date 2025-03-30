<script>
  import { onMount } from "svelte";

  import { Post } from "$lib/post";
  import { addPost } from "../../database/dbService";

  let files = $state();

  let newPost = {
    title: "",
    image: "",
    text: "",
    password: ""
  };

  /**
   * Handle file upload and convert the image to Base64
   * @param {{ target: { files: any[]; }; }} event
   */
   function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        newPost.image = reader.result.split(",")[1]; // Extract Base64 string
      };
      reader.readAsDataURL(file); // Read the file as a Data URL
    }
  }

  function createPost() {
    if (newPost.password === "admin") {
      const post = new Post(
        "",
        newPost.title,
        newPost.image,
        newPost.text,
        0,
        new Date()
      );

      addPost(post).then(() => {
        console.log("New Post Added:", post);

        // Reset the form
        newPost = {
          title: "",
          image: "",
          text: "",
          password: ""
        };

        //redirect to home page
        window.location.href = "/";
      });

    } else {
      alert("Invalid password. You are not authorized to add a post.");
    }
  }
</script>

<style>
  .add-post-container {
    max-width: 600px;
    margin: 2rem auto;
    padding: 1rem;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .add-post-container h1 {
    text-align: center;
    margin-bottom: 1rem;
    font-size: 1.5rem;
    color: #333;
  }

  .add-post-container form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .add-post-container input,
  .add-post-container textarea {
    width: auto;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }

  .add-post-container button {
    align-self: flex-end;
    padding: 0.5rem 1rem;
    background-color: #333;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
  }

  .add-post-container button:hover {
    background-color: #555;
  }
</style>

<div class="add-post-container">
  <h1>Add a New Post</h1>
  <form on:submit|preventDefault={createPost}>
    <input
      type="text"
      placeholder="Title"
      bind:value={newPost.title}
      required
    />
    <input
      id="image-upload"
      type="file"
      accept="image/png, image/jpeg"
      on:change={handleFileUpload}
      required
    />
    <textarea
      placeholder="Description"
      bind:value={newPost.text}
      rows="6"
      required
    ></textarea>
    <input
      type="password"
      placeholder="Password"
      bind:value={newPost.password}
      required
    />
    <button type="submit">Add Post</button>
  </form>
</div>
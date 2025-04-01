import { Post } from "$lib/post";
import { Comment } from "$lib/comment";

export let postsData: Post[] = [
    new Post(
        "1",
        "Exploring SvelteKit",
        "Learn how SvelteKit simplifies building modern web applications.",
        12,
        new Date("2025-03-01T10:00:00"),
        "John",
        "https://149842033.v2.pressablecdn.com/wp-content/uploads/2018/04/bona-free-bootstrap-blog-templates.jpg",
    ),
    new Post(
        "2",
        "Understanding Reactivity in Svelte",
        "A deep dive into Svelte's reactivity model and how it works.",
        8,
        new Date("2025-03-02T10:00:00"),
        "Jane",
        "https://w3layouts.b-cdn.net//wp-content/uploads/2022/07/Blog-Store-Website-Template-scaled.jpg",
    ),
    new Post(
        "3",
        "Styling in Svelte",
        "Discover the different ways to style your Svelte components.",
        5,
        new Date("2025-03-03T10:00:00"),
        "Alice",
        "https://themewagon.com/wp-content/uploads/2018/07/Original-Free-Bootstrap-Blog-Website-Template-1.jpg",
    )
];


export let commentsData: Comment[] = [
  new Comment("1", "Great post! Very informative.", "Alice", new Date("2025-03-01T10:00:00"), "1"),
  new Comment("2", "I love SvelteKit! Thanks for sharing.", "Bob", new Date("2025-03-02T12:30:00"), "1"),
  new Comment("3", "This helped me understand reactivity better.", "Charlie", new Date("2025-03-03T14:45:00"), "1"),
  new Comment("4", "Can you explain more about stores?", "Dave", new Date("2025-03-04T16:00:00"), "2"),
  new Comment("5", "Styling in Svelte is so flexible!", "Eve", new Date("2025-03-05T18:15:00"), "3"),
  new Comment("6", "Great tips on styling components.", "Frank", new Date("2025-03-06T20:30:00"), "3")
];
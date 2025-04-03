export class Post {
  id: string;
  title: string;
  text: string;
  likes: number;
  user: string;
  date: Date;
  image: string;

  constructor(
      id: string,
      title: string,
      text: string,
      likes: number,
      date: Date,
      user: string,
      image: string,
  ) {
      this.id = id;
      this.title = title;
      this.text = text;
      this.likes = likes;
      this.user = user;
      this.image = image;
      this.date = date
  }
}
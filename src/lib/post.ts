export class Post {
  _id: string;
  title: string;
  text: string;
  likes: number;
  date: Date;
  user: string;
  image: string;

  constructor(
      _id: string,
      title: string,
      text: string,
      likes: number,
      date: Date,
      user: string,
      image: string,
  ) {
      this._id = _id;
      this.title = title;
      this.text = text;
      this.likes = likes;
      this.date = date;
      this.user = user;
      this.image = image;
  }
}
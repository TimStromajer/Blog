export class Post {
  _id: string;
  title: string;
  image: string;
  text: string;
  likes: number;
  date: Date;

  constructor(
      _id: string,
      title: string,
      image: string,
      text: string,
      likes: number,
      date: Date
  ) {
      this._id = _id;
      this.title = title;
      this.image = image;
      this.text = text;
      this.likes = likes;
      this.date = date;
  }
}
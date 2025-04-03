export class Comment {
  id: string;
  text: string;
  user: string;
  date: Date;
  postId: string;

  constructor(id: string, text: string, user: string, date: Date, postId: string) {
      this.id = id;
      this.text = text;
      this.user = user;
      this.date = date;
      this.postId = postId;
  }
}
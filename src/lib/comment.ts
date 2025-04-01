export class Comment {
  id_: string;
  text: string;
  user: string;
  date: Date;
  postId: string;

  constructor(id_: string, text: string, user: string, date: Date, postId: string) {
      this.id_ = id_;
      this.text = text;
      this.user = user;
      this.date = date;
      this.postId = postId;
  }
}
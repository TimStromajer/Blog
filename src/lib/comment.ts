export class Comment {
  _id: string;
  text: string;
  user: string;
  date: Date;
  postId: string;

  constructor(_id: string, text: string, user: string, date: Date, postId: string) {
      this._id = _id;
      this.text = text;
      this.user = user;
      this.date = date;
      this.postId = postId;
  }
}
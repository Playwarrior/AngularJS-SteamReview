export class Review {

  constructor(
    public _id: string,
    public appId: string,
    public title: string,
    public content: string,
    public postDate: Date,
    public edited: boolean,
    public user: string,
    public votes: {}) {
  }
}

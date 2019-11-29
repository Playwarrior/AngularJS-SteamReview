export class Comment {

  constructor(
    public user: string,
    public content: string,
    public postDate: Date,
    public edited: boolean,
    public upVoteCount: number,
    public downVoteCount: number,
    public isUpVoted: boolean,
    public isDownVoted: boolean
  ) {
  }
}

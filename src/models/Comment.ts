export class Comment {

  constructor(
    public _id: string,
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

  upVote() {
  }

  downVote() {

  }
}

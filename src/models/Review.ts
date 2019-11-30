export class Review {

  constructor(
    public _id: string,
    public appId: string,
    public title: string,
    public content: string,
    public postDate: Date,
    public edited: boolean,
    public user: string,
    public upVoteCount: number,
    public downVoteCount: number,
    public isUpVoted: boolean,
    public isDownVoted: boolean) {
  }

  upVote() {
    if (!this.isUpVoted) {
      this.isUpVoted = true;
      this.upVoteCount++;

      if (this.isDownVoted) {
        this.downVoteCount--;
        this.isDownVoted = false;
      }
    }
  }

  downVote() {
    if (!this.isDownVoted) {
      this.isDownVoted = true;
      this.downVoteCount++;

      if (this.isUpVoted) {
        this.upVoteCount--;
        this.isUpVoted = false;
      }
    }
  }
}

export class Review {

  user: string;

  constructor(public appId: string,
              public title: string,
              public content: string,
              public date: Date,
              public edited: boolean,
              public votes: {}) {
  }
}

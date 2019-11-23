export class Review {

  constructor(public user: string,
              public appId: string,
              public title: string,
              public content: string,
              public date: Date,
              public edited: boolean,
              public votes: {}) {
  }
}

export class Profile {

  constructor(
    public steamid: string,
    public communityvisibilitystate: number,
    public profilestate: number,
    public lastlogoff: number,
    public profileurl: string,
    public avatar: string,
    public avatarmedium: string,
    public avatarfull: string,
    public personastate: number,
    public realname: string,
    public primaryclanid: string,
    public timecreated: string,
    public personastateflags: number,
    public loccountrycode: string
  ) {

  }

}

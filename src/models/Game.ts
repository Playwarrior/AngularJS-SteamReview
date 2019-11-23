export class Game {

  constructor(
    public appid: string,
    public name: string,
    public playtime_forever: number,
    public img_icon_url: string,
    public img_logo_url: string,
    public has_community_visible_stats: boolean,
    public playtime_windows_forever: number,
    public playtime_mac_forever: number,
    public playtime_linux_forever: number) {
  }

  getIcon(): string {
    return `http://media.steampowered.com/steamcommunity/public/images/apps/${this.appid}/${this.img_icon_url}.jpg`;
  }

  getLogo(): string {
    return `http://media.steampowered.com/steamcommunity/public/images/apps/${this.appid}/${this.img_logo_url}.jpg`;
  }
}

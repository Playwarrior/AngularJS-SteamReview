import {Component, Input, OnInit} from '@angular/core';
import {Game} from '../../../models/Game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  @Input() game: { playtime_mac_forever: number; img_icon_url: string; playtime_linux_forever: number; has_community_visible_stats: boolean; playtime_windows_forever: number; appid: string; name: string; img_logo_url: string; playtime_forever: number };

  constructor() { }

  ngOnInit() {
  }
}

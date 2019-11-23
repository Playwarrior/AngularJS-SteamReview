import {Component, OnInit} from '@angular/core';
import {InLogService} from '../in-log.service';
import {GameService} from '../game.service';
import {Game} from '../../models/Game';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  games: Game[];

  constructor(public inLog: InLogService, private gamesService: GameService) {
  }

  ngOnInit() {
    this.gamesService.getGames().subscribe(games => {
      this.games = games;

    });
  }

  counter(i: number) {
    return new Array(Math.ceil(i));
  }
}

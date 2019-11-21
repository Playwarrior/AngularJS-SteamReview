import {Component, OnInit} from '@angular/core';
import {InLogService} from '../in-log.service';
import {GameService} from '../game.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  gamesarray: string;

  constructor(public inLog: InLogService, private games: GameService) {
  }

  ngOnInit() {
    this.games.getGames().subscribe(games => {
      this.gamesarray = games;
    });
  }
}

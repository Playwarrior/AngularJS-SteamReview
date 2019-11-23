import {Component, OnInit} from '@angular/core';
import {InLogService} from '../in-log.service';
import {GameService} from '../game.service';
import {Game} from '../../models/Game';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  games: Game[];
  title = new FormControl("");

  constructor(public inLog: InLogService, private router: Router, private gamesService: GameService) {
  }

  ngOnInit() {
    if(!this.inLog.isLoggedIn()) {
      this.router.navigate(['']);
    } else {
      this.gamesService.getGames().subscribe(games => {
        this.games = games.sort((a, b) => a.name.localeCompare(b.name));
      });
    }
  }

  getFilteredGames(): Game[] {
    if(this.title.value === undefined || this.title.value === null || this.title.value === '' || this.title.value === "")
      return this.games;
    else {
      return this.games.filter((value) => value.name.toLowerCase().match(this.title.value.toString().toLowerCase()));
    }
  }

  counter(i: number) {
    return new Array(Math.ceil(i));
  }
}

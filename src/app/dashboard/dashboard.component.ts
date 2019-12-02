import {Component, OnInit} from '@angular/core';
import {InLogService} from '../in-log.service';
import {GameService} from '../game.service';
import {Game} from '../../models/Game';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {clone} from '../../util/cloning';
import {ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  gameList: Game[];
  games: Game[];

  constructor(public inLog: InLogService, private router: Router, private gamesService: GameService, private cdRef: ChangeDetectorRef) {
  }

  search(term: string): void {
    term = term.trim();

    if (term && term.length > 0) {
      this.gameList = clone<Game>(this.games).filter(game => game.name.toLowerCase().startsWith(term.trim().toLowerCase()));
    } else {
      this.gameList = clone<Game>(this.games);
    }

    this.gameList.sort((a, b) => a.name.localeCompare(b.name));

    this.cdRef.detectChanges();
  }

  ngOnInit() {
    if (this.inLog.isLoggedIn()) {
      this.gamesService.getGames((games) => {
        this.games = clone<Game>(games);
        this.gameList = clone<Game>(games);
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  getGameRow(index): Game[] {
    return [this.gameList[index * 4], this.gameList[index * 4 + 1], this.gameList[index * 4 + 2], this.gameList[index * 4 + 3]];
  }

  counter() {
    return new Array(Math.ceil(this.gameList.length / 4));
  }
}

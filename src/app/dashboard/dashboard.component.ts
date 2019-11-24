import {Component, OnInit} from '@angular/core';
import {InLogService} from '../in-log.service';
import {GameService} from '../game.service';
import {Game} from '../../models/Game';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  games: Game[];
  private searchTerms = new Subject<string>();

  constructor(public inLog: InLogService, private router: Router, private gamesService: GameService) {
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit() {
    if (!this.inLog.isLoggedIn()) {
      this.router.navigate(['']);

    } else {
      this.searchTerms.pipe(
        debounceTime(800),

        distinctUntilChanged(),

        switchMap((term: string) => this.gamesService.searchGames(term))
      ).subscribe(games => this.games = games);
    }
  }

  counter(i: number) {
    return new Array(Math.ceil(i) + 1);
  }
}

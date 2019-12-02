import {Injectable} from '@angular/core';
import {InLogService} from './in-log.service';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Game} from '../models/Game';
import {clone} from '../util/cloning';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private urlBase: string = 'https://steam-app-back-end.herokuapp.com/apiv1/users/games';
  private nonUrlBase: string = 'https://steam-app-back-end.herokuapp.com/apiv2/users/';

  private games: Game[] = [];

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private inLog: InLogService, private http: HttpClient) {
  }

  getGames(cb) {
    if (this.inLog.isLoggedIn()) {
      return this.http.get<Game[]>(this.urlBase + `?token=${this.inLog.getUser().token}`, this.httpOptions).subscribe(games => {
        games.forEach(game => this.games.push(game));
        cb(games);
      });
    } else {
      this.games = null;
      return of(null);
    }
  }

  getGame(appId: string, id: string, cb) {
    if (this.inLog.isLoggedIn()) {
      if (!this.hasGame(appId)) {
        this.http.get<Game>(this.urlBase + `/${appId}?token=${this.inLog.getUser().token}`, this.httpOptions).subscribe(game => {
          this.games.push(game);
          cb(game);
        });
      } else {
        cb(this.games.filter(game => game.appid == appId)[0]);
      }
    } else {
      this.http.get<Game>(this.nonUrlBase + `${id}/games/${appId}`, this.httpOptions).subscribe((game) => {
        this.games.push(game);
        cb(game);
      });
    }
  }

  private hasGame(appId: string): boolean {
    return this.games != null && this.games.filter(game => game.appid == appId).length > 0;
  }
}

import {Injectable} from '@angular/core';
import {InLogService} from './in-log.service';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Game} from '../models/Game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private urlBase: string = 'https://steam-app-back-end.herokuapp.com/apiv1/users/games';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private inLog: InLogService, private http: HttpClient) {
  }

  getGames(): Observable<Game[]> {
    if (this.inLog.isLoggedIn()) {
      return this.http.get<Game[]>(this.urlBase + `?token=${this.inLog.getUser().token}`, this.httpOptions);
    } else {
      return of(null);
    }
  }

  getGame(appId: string): Observable<Game> {
    if (this.inLog.isLoggedIn()) {
      return this.http.get<Game>(this.urlBase + `/${appId}?token=${this.inLog.getUser().token}`, this.httpOptions);
    } else {
      return of(null);
    }
  }

  searchGames(name: string): Observable<Game[]> {
    if (this.inLog.isLoggedIn()) {
      return this.http.get<Game[]>(this.urlBase + `?token=${this.inLog.getUser().token}&name=${name}`, this.httpOptions);
    } else {
      return of(null);
    }
  }
}

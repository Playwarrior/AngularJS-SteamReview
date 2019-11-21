import {Injectable} from '@angular/core';
import {InLogService} from './in-log.service';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private urlBase: string = 'http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=D640AA92C21657F4319FE96D5A269F4D&format=json';

  private httpOptions = {

  };

  constructor(private inLog: InLogService, private http: HttpClient) {
  }

  getGames(): Observable<any> {
    if (this.inLog.isLoggedIn()) {
      return this.http.get(this.urlBase + `&steamid=${this.inLog.getUser().steam}`, this.httpOptions);
    } else {
      return of(null);
    }
  }
}

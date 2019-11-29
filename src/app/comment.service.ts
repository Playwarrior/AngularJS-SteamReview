import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Comment} from '../models/Comment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {InLogService} from './in-log.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private baseApiUrl = 'https://steam-app-back-end.herokuapp.com/apiv1/comments';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private loginService: InLogService) {
  }

  getComments(reviewId) {
    if (this.loginService.isLoggedIn()) {
      return this.http.get<Comment[]>(this.baseApiUrl + `/${reviewId}?token=${this.loginService.getUser().token}`, this.httpOptions);
    } else {
      return of(null);
    }
  }
}

import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Comment} from '../models/Comment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {InLogService} from './in-log.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private baseApiUrl = 'https://steam-app-back-end.herokuapp.com/apiv1/';
  private nonTokenBaseURL = 'https://steam-app-back-end.herokuapp.com/apiv2/comments/';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private loginService: InLogService) {
  }

  getComments(reviewId) {
    if (this.loginService.isLoggedIn()) {
      return this.http.get<Comment[]>(this.baseApiUrl + `comments/${reviewId}?token=${this.loginService.getUser().token}`, this.httpOptions);
    } else {
      return this.http.get<Comment[]>(this.nonTokenBaseURL + reviewId, this.httpOptions);
    }
  }

  postComment(reviewId, content) {
    if (this.loginService.isLoggedIn()) {
      return this.http.post<Comment>(this.baseApiUrl + `reviews/${reviewId}/comment?token=${this.loginService.getUser().token}`, {
        content: content
      }, this.httpOptions);
    } else {
      return of(null);
    }
  }

  upVoteComment(id) {
    if (this.loginService.isLoggedIn()) {
      return this.http.put(this.baseApiUrl + `comments/${id}/upvote?token=${this.loginService.getUser().token}`, this.httpOptions);
    } else {
      return of(null);
    }
  }

  downVoteComment(id) {
    if (this.loginService.isLoggedIn()) {
      return this.http.put(this.baseApiUrl + `comments/${id}/downvote?token=${this.loginService.getUser().token}`, this.httpOptions);
    } else {
      return of(null);
    }
  }

  deleteComment(id) {
    if(this.loginService.isLoggedIn()) {
      return this.http.delete(this.baseApiUrl + `comments/${id}?token=${this.loginService.getUser().token}`, this.httpOptions);
    } else {
      return of(null);
    }
  }
}

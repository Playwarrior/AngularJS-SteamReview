import {Injectable} from '@angular/core';
import {Review} from '../models/Review';
import {Observable, of} from 'rxjs';
import {InLogService} from './in-log.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  baseUrl = 'https://steam-app-back-end.herokuapp.com/apiv1';
  baseUrlNonToken = 'https://steam-app-back-end.herokuapp.com/apiv2';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private inLog: InLogService, private http: HttpClient) {
  }

  getReviews(appId: string): Observable<Review[]> {
    if (this.inLog.isLoggedIn()) {
      return this.http.get<Review[]>(this.baseUrl + `/reviews/${appId}?token=${this.inLog.getUser().token}`, this.httpOptions);
    } else {
      of(null);
    }
  }

  getReview(id: string): Observable<Review> {
    if (this.inLog.isLoggedIn()) {
      return this.http.get<Review>(this.baseUrl + '/review/' + id + `?token=${this.inLog.getUser().token}`, this.httpOptions);
    } else {
      of(null);
    }
  }

  getReviewsByUser(id: string): Observable<Review[]> {
    console.log('WOW');
    if (this.inLog.isLoggedIn()) {
      return this.http.get<Review[]>(this.baseUrl + `/users/${id}/reviews?token=${this.inLog.getUser().token}`, this.httpOptions);
    } else {
      return this.http.get<Review[]>(this.baseUrlNonToken + `/users/${id}/reviews`, this.httpOptions);
    }
  }

  postReview(appId, title, content) {
    if (this.inLog.isLoggedIn()) {
      return this.http.post(this.baseUrl + `/reviews?token=${this.inLog.getUser().token}`, {
        title: title,
        content: content,
        appId: appId
      }, this.httpOptions);
    }
  }

  upVoteReview(id) {
    if (this.inLog.isLoggedIn()) {
      return this.http.put(this.baseUrl + `/reviews/${id}/upvote?token=${this.inLog.getUser().token}`, {}, this.httpOptions);
    }
  }

  downVoteReview(id) {
    if (this.inLog.isLoggedIn()) {
      return this.http.put(this.baseUrl + `/reviews/${id}/downvote?token=${this.inLog.getUser().token}`, {}, this.httpOptions);
    }
  }

  updateReview(id, title, content) {
    if (this.inLog.isLoggedIn()) {
      return this.http.put(this.baseUrl + `/reviews/${id}?token=${this.inLog.getUser().token}`, {
        title: title,
        content: content
      }, this.httpOptions);
    }
  }

  deleteReview(id): Observable<Object> {
    if (this.inLog.isLoggedIn()) {
      return this.http.delete(this.baseUrl + `/reviews/${id}?token=${this.inLog.getUser().token}`, this.httpOptions);
    } else {
      return of(null);
    }
  }
}

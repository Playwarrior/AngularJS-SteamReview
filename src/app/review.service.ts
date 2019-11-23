import {Injectable} from '@angular/core';
import {Review} from '../models/Review';
import {Observable, of} from 'rxjs';
import {InLogService} from './in-log.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  baseUrl = 'https://steam-app-back-end.herokuapp.com/apiv1/reviews';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private inLog: InLogService, private http: HttpClient) {
  }

  getReviews(appId: string): Observable<Review[]> {
    if (this.inLog.isLoggedIn()) {
      return this.http.get<Review[]>(this.baseUrl + `/${appId}?token=${this.inLog.getUser().token}`, this.httpOptions);
    } else {
      of(null);
    }
  }
}

import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/User';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {MessageService} from './message.service';
import {UserService} from './user.service';
import {Profile} from '../models/Profile';

@Injectable({
  providedIn: 'root'
})
export class InLogService {

  private baseApiUrl = 'https://steam-app-back-end.herokuapp.com/auth';

  private loggedIn: User;
  private loggedInProfile: Profile;

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient, private message: MessageService, private profileService: UserService) {

  }

  register(email: string, password: string, steam: string) {
    return this.http.post((this.baseApiUrl + '/register'), {
      email: email,
      password: password,
      steam: steam
    }, this.httpOptions).pipe(
      catchError(this.handleError<any>('register'))
    );
  }

  login(email: string, password: string, cb) {
    return this.http.post<User>((this.baseApiUrl + '/login'), {
      email: email,
      password: password
    }, this.httpOptions)
      .pipe(
        catchError(this.handleError<User>('login'))
      ).subscribe(user => {
        cb(user);
        this.loggedIn = user;
        this.profileService.getProfile(this.loggedIn.id, (profile) => {
          this.loggedInProfile = profile;
        })
      });
  }

  logout(){
    this.loggedIn = null;
    this.loggedInProfile = null;
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.message.push(operation, error.message);
      return of(result as T);
    };
  }

  isLoggedIn() {
    return this.loggedIn != null || this.loggedIn != undefined;
  }

  getUser(): User {
    return this.loggedIn;
  }

  getProfile(): Profile {
    return this.loggedInProfile;
  }
}

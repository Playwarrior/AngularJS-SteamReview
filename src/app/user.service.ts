import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Profile} from '../models/Profile';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly baseUrl: string = 'https://steam-app-back-end.herokuapp.com/apiv2/users/profile/';

  private profiles: Profile[] = [];

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {

  }

  getProfile(id, cb) {
    if (this.hasProfile(id)) {
      cb(this.profiles.filter(profile => profile.steamid == id)[0]);
    } else {
      this.http.get<Profile>(this.baseUrl + id, this.httpOptions).subscribe((profile) => {
        this.profiles.push(profile);
        cb(profile);
      })
    }
  }

  hasProfile(id) {
    return this.profiles.filter(profile => profile.steamid == id).length > 0;
  }
}

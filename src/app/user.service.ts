import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Profile} from '../models/Profile';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly baseUrl: string = 'https://steam-app-back-end.herokuapp.com/apiv2/users/';

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
      cb(this.profiles.filter(profile => profile.id == id)[0]);
    } else {
      this.http.get<Profile>(this.baseUrl + 'profile/' + id, this.httpOptions).subscribe((profile) => {
        this.profiles.push(profile);
        cb(profile);
      });
    }
  }

  hasProfile(id) {
    return this.profiles.filter(profile => profile.id == id).length > 0;
  }

  getProfiles(cb) {
    this.http.get(this.baseUrl, this.httpOptions).subscribe((object) => {
      let body = JSON.parse(JSON.stringify(object));
      return cb(body);
    });
  }
}

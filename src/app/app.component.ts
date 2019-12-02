import {AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {InLogService} from './in-log.service';
import {UserService} from './user.service';
import {Profile} from '../models/Profile';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Angular-SteamReview';
  profile: Profile;

  constructor(public inLog: InLogService, private router: Router) {

  }

  logout() {
    this.inLog.logout();
    this.router.navigate(['']);
  }

}

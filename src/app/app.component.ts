import {Component} from '@angular/core';
import {InLogService} from './in-log.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular-SteamReview';

  constructor(public inLog: InLogService) {

  }
}

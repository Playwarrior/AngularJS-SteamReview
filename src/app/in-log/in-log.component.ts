import {Component, OnInit} from '@angular/core';
import {InLogService} from '../in-log.service';
import {MessageService} from '../message.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-in-log',
  templateUrl: './in-log.component.html',
  styleUrls: ['./in-log.component.css']
})
export class InLogComponent implements OnInit {

  constructor(private inLog: InLogService, public message: MessageService, private router: Router) {
  }

  ngOnInit() {
  }

  logIn(email: string, password: string) {
    this.inLog.login(email, password, (user) => {
      if (user != null) {
        this.router.navigate(['/dashboard']);
      }
    });
  }
}

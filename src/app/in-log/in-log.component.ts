import {Component, OnInit} from '@angular/core';
import {InLogService} from '../in-log.service';
import {MessageService} from '../message.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-in-log',
  templateUrl: './in-log.component.html',
  styleUrls: ['./in-log.component.css']
})
export class InLogComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl("", [
      Validators.required,
      Validators.pattern('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')
    ]),
    password: new FormControl("", [
      Validators.required
    ]),
  });

  constructor(private inLog: InLogService, public message: MessageService, private router: Router) {
  }

  ngOnInit() {
  }

  login() {
    let value = this.loginForm.value;

    this.inLog.login(value.email, value.password, (user) => {
      if (user != null) {
        this.router.navigate(['/dashboard']);
      }
    });
  }
}

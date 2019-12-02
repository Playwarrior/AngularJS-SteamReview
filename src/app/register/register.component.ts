import {Component, OnInit} from '@angular/core';
import {InLogService} from '../in-log.service';
import {catchError} from 'rxjs/operators';
import {MessageService} from '../message.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')
    ]),
    password: new FormControl('', [
      Validators.required
    ]),
    steam: new FormControl('', [
      Validators.required
    ])
  });

  constructor(private inLog: InLogService, public message: MessageService, private router: Router) {
  }

  ngOnInit() {
  }

  register() {
    let value = this.registerForm.value;

    this.inLog.register(value.email, value.password, value.steam).subscribe((any) => {
      if (!this.message.get('register')) {
        this.router.navigate(['/login']);
      }
    });
  }
}

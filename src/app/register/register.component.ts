import {Component, OnInit} from '@angular/core';
import {InLogService} from '../in-log.service';
import {catchError} from 'rxjs/operators';
import {MessageService} from '../message.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private inLog: InLogService, public message: MessageService, private router: Router) {
  }

  ngOnInit() {
  }

  register(email: string, password: string, steam: string) {
    this.inLog.register(email, password, steam).subscribe((any) => {
      console.log(any);
      if (this.message.get('register') === null) {
        this.router.navigate(['']);
      }
    });
  }
}

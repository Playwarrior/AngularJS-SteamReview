import { Component, OnInit } from '@angular/core';
import {Profile} from '../../../models/Profile';

@Component({
  selector: 'app-profile-dashboard',
  templateUrl: './profile-dashboard.component.html',
  styleUrls: ['./profile-dashboard.component.css']
})
export class ProfileDashboardComponent implements OnInit {

  profile: Profile[];

  constructor() { }

  ngOnInit() {
  }

}

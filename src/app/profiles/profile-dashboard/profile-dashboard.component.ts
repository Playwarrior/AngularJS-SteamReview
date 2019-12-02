import {Component, OnInit} from '@angular/core';
import {Profile} from '../../../models/Profile';
import {UserService} from '../../user.service';

@Component({
  selector: 'app-profile-dashboard',
  templateUrl: './profile-dashboard.component.html',
  styleUrls: ['./profile-dashboard.component.css']
})
export class ProfileDashboardComponent implements OnInit {

  profile: Profile[] = [];

  constructor(private profileService: UserService) {
  }

  ngOnInit() {
    this.profileService.getProfiles((ids) => {
      for (let id of ids) {
        this.profileService.getProfile(id._id, (profile) => {
          this.profile.push(profile);
        });
      }
    });
  }

  counter() {
    return new Array(Math.ceil(this.profile.length / 4));
  }

  getProfiles(index) {
    return [this.profile[index * 4], this.profile[index * 4 + 1], this.profile[index * 4 + 2], this.profile[index * 4 + 3]];
  }

}

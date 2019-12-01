import {Component, OnInit} from '@angular/core';
import {Profile} from '../../models/Profile';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../user.service';
import {ReviewService} from '../review.service';
import {Review} from '../../models/Review';
import {Location} from '@angular/common';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {

  profile: Profile;

  reviews: Review[];
  reviewProfiles: Profile[] = [];

  constructor(private route: ActivatedRoute, private location: Location, private profileService: UserService, private reviewService: ReviewService) {
  }

  ngOnInit() {
    const params = this.route.snapshot.paramMap;

    let id = params.get(params.keys[0]);

    this.profileService.getProfile(id, (profile) => {
      this.profile = profile;

      if (profile) {
        this.reviewService.getReviewsByUser(id).subscribe((reviews) => {
          this.reviews = reviews;

          let index = 0;
          reviews.forEach(review => {
            this.getProfileAsync(review.user, index);
            index++;
          });
        });
      }
    });
  }

  getProfileAsync(user, index) {
    this.profileService.getProfile(user, (profile) => {
      this.reviewProfiles[index] = profile;
    });
  }

  getProfile(index) {
    return this.reviewProfiles[index];
  }

  goBack() {
    this.location.back();
  }
}

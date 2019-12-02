import {Component, OnInit} from '@angular/core';
import {Profile} from '../../models/Profile';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../user.service';
import {ReviewService} from '../review.service';
import {Review} from '../../models/Review';
import {Location} from '@angular/common';
import {Game} from '../../models/Game';
import {GameService} from '../game.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {

  profile: Profile;

  reviews: Review[];
  reviewProfiles: Profile[] = [];
  reviewGames: Game[] = [];

  constructor(private route: ActivatedRoute, private location: Location, private profileService: UserService, private reviewService: ReviewService, private gameService: GameService) {
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
            this.getInfoAsync(review.user, review.appId, index);
            index++;
          });
        });
      }
    });
  }

  getInfoAsync(user, appId, index) {
    this.profileService.getProfile(user, (profile) => {
      this.reviewProfiles[index] = profile;
    });

    this.gameService.getGame(appId, user,(game) => {
      this.reviewGames[index] = game;
    })
  }

  getProfile(index) {
    return this.reviewProfiles[index];
  }

  getGame(index) {
    return this.reviewGames[index];
  }

  goBack() {
    this.location.back();
  }
}

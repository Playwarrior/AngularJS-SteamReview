import {Component, OnInit} from '@angular/core';
import {Game} from '../../models/Game';
import {ActivatedRoute} from '@angular/router';
import {GameService} from '../game.service';
import {Location} from '@angular/common';
import {Review} from '../../models/Review';
import {ReviewService} from '../review.service';
import {InLogService} from '../in-log.service';
import {Router} from '@angular/router';
import {UserService} from '../user.service';
import {clone} from '../../util/cloning';
import {Profile} from '../../models/Profile';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  game: Game;
  reviews: Review[];
  profiles: Profile[] = [];

  limit: number = 15;
  page: number = 1;
  maxPage: number;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private reviewService: ReviewService,
    public inLogService: InLogService,
    private userService: UserService,
    private location: Location,
    private router: Router
  ) {
  }

  getData() {
    const id = +this.route.snapshot.paramMap.get('id');

    this.gameService.getGame(id.toString(), null,(game) => {
      this.game = game;
    });

    this.reviewService.getReviews(id.toString()).subscribe(reviews => {
      this.reviews = clone<Review>(reviews);
      this.maxPage = this.reviews.length / this.limit;

      let index = 0;

      reviews.forEach(review => {
        this.getProfileAsync(review.user, index);
        index++;
      });
    });
  }

  getProfileAsync(user, index) {
    this.userService.getProfile(user, (profile) => {
      this.profiles[index] = profile;
    });
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    if (!this.inLogService.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
      this.getData();
    }
  }

  hasNextPage() {
    return this.maxPage > this.page;
  }

  hasPreviousPage() {
    return this.page > 1;
  }

  nextPage() {
    if (this.hasNextPage()) {
      this.page++;
    }
  }

  previousPage() {
    if (this.hasPreviousPage()) {
      this.page--;
    }
  }

  counter() {
    return new Array(this.limit);
  }

  getReview(index: number): Review {
    return this.reviews[((this.page - 1) * this.limit) + index];
  }

  getProfile(index: number): Profile {
    return this.profiles[((this.page - 1) * this.limit) + index];
  }

  hasReview(): boolean {
    return this.getUsersReview() != null;
  }

  getUsersReview() {
    if(this.reviews) {
      for (let i = 0; i < this.reviews.length; i++) {
        let review = this.reviews[i];
        if (review.user == this.inLogService.getUser().id) {
          return review;
        }
      }
    }
    return null;
  }
}

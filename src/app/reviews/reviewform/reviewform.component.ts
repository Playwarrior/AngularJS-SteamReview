import {Component, OnInit} from '@angular/core';
import {Review} from '../../../models/Review';
import {ReviewService} from '../../review.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Location} from '@angular/common';
import {InLogService} from '../../in-log.service';
import {Game} from '../../../models/Game';
import {GameService} from '../../game.service';

@Component({
  selector: 'app-reviewform',
  templateUrl: './reviewform.component.html',
  styleUrls: ['./reviewform.component.css']
})
export class ReviewformComponent implements OnInit {

  review: Review = null;
  game: Game;


  appId;
  id;

  reviewForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
  });

  constructor(private login: InLogService, private gameService: GameService, private reviewService: ReviewService, private route: ActivatedRoute, private location: Location, private router: Router) {
  }

  ngOnInit() {
    if (this.login.isLoggedIn()) {
      const params = this.route.snapshot.paramMap;

      this.appId = params.get(params.keys[0]);
      this.id = params.get(params.keys[1]);

      if (this.id) {
        this.reviewService.getReview(this.id.toString()).subscribe((review => {
          if (review) {
            this.review = review;
            this.reviewForm.get('title').setValue(review.title);
            this.reviewForm.get('content').setValue(review.content);
          }
        }));
      }

      this.gameService.getGame(this.appId, (game) => {
        if (game) {
          this.game = game;
        }
      });
    } else {
      this.router.navigate(['']);
    }
  }

  post() {
    let value = this.reviewForm.value;
    this.reviewService.postReview(this.appId, value.title, value.content).subscribe(() => {
      this.location.back();
    });
  }

  update() {
    let value = this.reviewForm.value;
    this.reviewService.updateReview(this.id, value.title, value.content).subscribe(() => {
      this.location.back();
    });
  }

  goBack(){
    this.location.back();
  }
}

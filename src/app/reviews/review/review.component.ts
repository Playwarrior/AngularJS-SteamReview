import {AfterContentChecked, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Review} from '../../../models/Review';
import {Game} from '../../../models/Game';
import {InLogService} from '../../in-log.service';
import {ReviewService} from '../../review.service';
import {Profile} from '../../../models/Profile';
import {UserService} from '../../user.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  @Input() review: Review;
  @Input() game: Game;
  @Input() profile: Profile;

  constructor(private login: InLogService, private reviewService: ReviewService, private userService: UserService, private changeDetector: ChangeDetectorRef) {

  }

  ngOnInit() {
  }

  delete() {
    this.reviewService.deleteReview(this.review._id).subscribe((object) => {
      this.review = null;
    });
  }

  upVote() {
    if (!this.review.isUpVoted) {
      this.reviewService.upVoteReview(this.review._id).subscribe((object) => {
        this.review.isUpVoted = true;
        this.review.upVoteCount++;

        if (this.review.isDownVoted) {
          this.review.downVoteCount--;
          this.review.isDownVoted = false;
        }
      });
    }
  }

  downVote() {
    if (!this.review.isDownVoted) {
      this.reviewService.downVoteReview(this.review._id).subscribe((object) => {
        this.review.isDownVoted = true;
        this.review.downVoteCount++;

        if (this.review.isUpVoted) {
          this.review.upVoteCount--;
          this.review.isUpVoted = false;
        }
      });
    }
  }

  canEditDelete() {
    return this.login.getUser().id == this.review.user;
  }
}

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
export class ReviewComponent implements OnInit, AfterContentChecked {

  @Input() review: Review;
  @Input() game: Game;
  @Input() profile: Profile;

  constructor(private login: InLogService, private reviewService: ReviewService, private userService: UserService, private changeDetector: ChangeDetectorRef) {

  }

  ngOnInit() {
  }

  delete() {
    this.reviewService.deleteReview(this.review._id).subscribe(() => {

    });
  }

  canEditDelete() {
    return this.login.getUser().id == this.review.user;
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }
}

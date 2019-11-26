import {Component, Input, OnInit} from '@angular/core';
import {Review} from '../../../models/Review';
import {Game} from '../../../models/Game';
import {InLogService} from '../../in-log.service';
import {ReviewService} from '../../review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  @Input() review: Review;
  @Input() game: Game;

  constructor(private login: InLogService, private reviewService: ReviewService) {

  }

  ngOnInit() {

  }

  delete() {
    this.reviewService.deleteReview(this.review._id).subscribe(() => {

    });
  }

  canEditDelete(){
    var l = this.login.getUser().id == this.review.user;

    console.log(this.login.getUser().id);
    console.log(this.review.user);

    console.log(l);

    return l;
  }
}

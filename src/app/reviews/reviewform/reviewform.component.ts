import {Component, OnInit} from '@angular/core';
import {Review} from '../../../models/Review';
import {ReviewService} from '../../review.service';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-reviewform',
  templateUrl: './reviewform.component.html',
  styleUrls: ['./reviewform.component.css']
})
export class ReviewformComponent implements OnInit {

  review: Review = null;

  appId;
  id;

  reviewForm : FormGroup;

  constructor(private reviewService: ReviewService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.appId = +this.route.snapshot.paramMap.get('id');
    this.id = +this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.reviewService.getReview(this.id.toString()).subscribe((review => {
        this.review = review;
      }));
    }

    this.reviewForm = new FormGroup({
      title: new FormControl(this.review.title || '', Validators.required),
      content: new FormControl(this.review.content || '', Validators.required),
    });

  }

  post() {
    let value = this.reviewForm.value;
    this.reviewService.postReview(this.appId, value.title, value.content).subscribe(() => {
      //TODO: ADD ROUTING
    });
  }

  update() {
    let value = this.reviewForm.value;
    this.reviewService.updateReview(this.id, value.title, value.content).subscribe(() => {
      //TODO: ADD ROUTING!
    });
  }
}

import {Component, OnInit} from '@angular/core';
import {Review} from '../../models/Review';
import {Profile} from '../../models/Profile';
import {Comment} from '../../models/Comment';
import {CommentService} from '../comment.service';
import {ReviewService} from '../review.service';
import {InLogService} from '../in-log.service';
import {UserService} from '../user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Location} from '@angular/common';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  maxPage: number;
  limit: number = 15;
  page: number = 1;

  review: Review;
  reviewProfile: Profile;

  comments: Comment[] = [];
  profiles: Profile[] = [];

  commentGroup: FormGroup = new FormGroup({
    content: new FormControl('', Validators.required)
  });

  constructor(private commentService: CommentService, private reviewService: ReviewService, public loginService: InLogService, private profileService: UserService, private route: ActivatedRoute, private router: Router, private location: Location) {

  }

  ngOnInit() {
    const params = this.route.snapshot.paramMap;

    let id = params.get(params.keys[0]);

    if (id) {
      this.reviewService.getReview(id.toString()).subscribe((review) => {
        this.review = review;

        this.profileService.getProfile(review.user, (profile) => {
          this.reviewProfile = profile;
        });
      });

      this.commentService.getComments(id.toString()).subscribe((comments) => {
        this.comments = comments;
        this.maxPage = Math.ceil(comments.length / 15);

        let index = 0;
        comments.forEach((c) => {
          this.getProfileAsync(c.user, index);
          index++;
        });
      });
    }
  }

  getProfileAsync(user, index) {
    this.profileService.getProfile(user, (profile) => {
      this.profiles[index] = profile;
    });
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

  getProfile(index): Profile {
    return this.profiles[((this.page - 1) * this.limit) + index];
  }

  getComment(index): Comment {
    return this.comments[((this.page - 1) * this.limit) + index];
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

  post() {
    if (this.review && this.commentGroup.valid) {
      let value = this.commentGroup.value;
      this.commentService.postComment(this.review._id, value.content).subscribe((comment) => {
        this.comments.push(comment);
        this.getProfileAsync(comment.user, this.profiles.length);
        this.commentGroup.get('content').setValue('');
      });
    }
  }

  goBack() {
    this.location.back();
  }
}

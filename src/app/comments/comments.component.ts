import {Component, OnInit} from '@angular/core';
import {Review} from '../../models/Review';
import {Profile} from '../../models/Profile';
import {Comment} from '../../models/Comment';
import {CommentService} from '../comment.service';
import {ReviewService} from '../review.service';
import {InLogService} from '../in-log.service';
import {UserService} from '../user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  maxPage: number;
  limit: number;
  page: number;

  review: Review;
  reviewProfile: Profile;

  comments: Comment[] = [];
  profiles: Profile[] = [];

  constructor(private commentService: CommentService, private reviewService: ReviewService, private loginService: InLogService, private profileService: UserService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    if(this.loginService.isLoggedIn()) {
      const params = this.route.snapshot.paramMap;

      let id = params.get(params.keys[0]);

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
    }else {
      this.router.navigate(['']);
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
    return this.profiles[(this.page * this.limit) + index];
  }

  getComment(index): Comment {
    return this.comments[(this.page * this.limit) + index];
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
}

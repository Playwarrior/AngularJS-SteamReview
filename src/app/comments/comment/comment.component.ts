import {Component, Input, OnInit} from '@angular/core';
import {Profile} from '../../../models/Profile';
import {Comment} from '../../../models/Comment';
import {InLogService} from '../../in-log.service';
import {CommentService} from '../../comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() profile: Profile;
  @Input() comment: Comment;

  constructor(private login: InLogService, private commentService: CommentService) {

  }

  ngOnInit() {
  }

  upVote() {
    if (!this.comment.isUpVoted) {
      this.commentService.upVoteComment(this.comment._id).subscribe((object) => {
        if (!this.comment.isUpVoted) {
          this.comment.isUpVoted = true;
          this.comment.upVoteCount++;

          if (this.comment.isDownVoted) {
            this.comment.downVoteCount--;
            this.comment.isDownVoted = false;
          }
        }
      });
    }
  }

  downVote() {
    if (!this.comment.isDownVoted) {
      this.commentService.downVoteComment(this.comment._id).subscribe((object) => {
        if (!this.comment.isDownVoted) {
          this.comment.isDownVoted = true;
          this.comment.downVoteCount++;

          if (this.comment.isUpVoted) {
            this.comment.upVoteCount--;
            this.comment.isUpVoted = false;
          }
        }
      });
    }
  }

  canEditDelete() {
    return this.login.isLoggedIn() && this.login.getUser().id == this.comment.user;
  }

  delete() {
    this.commentService.deleteComment(this.comment._id).subscribe((object) => {
      this.comment = null;
      this.profile = null;
    })
  }
}

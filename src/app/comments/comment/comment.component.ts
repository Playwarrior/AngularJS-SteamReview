import {Component, Input, OnInit} from '@angular/core';
import {Profile} from '../../../models/Profile';
import {Comment} from '../../../models/Comment';
import {InLogService} from '../../in-log.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() profile: Profile;
  @Input() comment: Comment;

  constructor(private login: InLogService) {

  }

  ngOnInit() {
  }

  upVote() {

  }

  downVote() {

  }

  canEditDelete() {
    return this.login.getUser().id == this.comment.user;
  }

  delete() {
    //TODO!
  }
}

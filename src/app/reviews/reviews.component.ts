import {Component, Input, OnInit} from '@angular/core';
import {Game} from '../../models/Game';
import {ActivatedRoute} from '@angular/router';
import {GameService} from '../game.service';
import {Location} from '@angular/common';
import {Review} from '../../models/Review';
import {ReviewService} from '../review.service';
import {InLogService} from '../in-log.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  game: Game;
  reviews: Review[];

  limit: number = 15;
  page: number = 1;
  maxPage: number;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private reviewService: ReviewService,
    public inLogService: InLogService,
    private location: Location,
    private router: Router
  ) {
  }

  getData() {
    const id = +this.route.snapshot.paramMap.get('id');

    this.gameService.getGame(id + '').subscribe(game => {
      this.game = game;
    });

    this.reviewService.getReviews(id + '').subscribe(reviews => {
      this.reviews = reviews;
      console.log(reviews);
      this.maxPage = this.reviews.length / this.limit;
    });
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    if (!this.inLogService.isLoggedIn()) {
      this.router.navigate(['']);
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
}

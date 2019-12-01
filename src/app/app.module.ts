import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {InLogComponent} from './in-log/in-log.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RegisterComponent} from './register/register.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {GameComponent} from './dashboard/game/game.component';
import {ReviewsComponent} from './reviews/reviews.component';
import { ReviewComponent } from './reviews/review/review.component';
import { ReviewformComponent } from './reviews/reviewform/reviewform.component';
import { CommentsComponent } from './comments/comments.component';
import { CommentComponent } from './comments/comment/comment.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { ProfileDashboardComponent } from './profiles/profile-dashboard/profile-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    InLogComponent,
    RegisterComponent,
    DashboardComponent,
    GameComponent,
    ReviewsComponent,
    ReviewComponent,
    ReviewformComponent,
    CommentsComponent,
    CommentComponent,
    ProfilesComponent,
    ProfileDashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {InLogComponent} from './in-log/in-log.component';
import {RegisterComponent} from './register/register.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ReviewsComponent} from './reviews/reviews.component';
import {ReviewformComponent} from './reviews/reviewform/reviewform.component';
import {CommentsComponent} from './comments/comments.component';
import {ProfilesComponent} from './profiles/profiles.component';


const routes: Routes = [
  {path: 'login', component: InLogComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'register', component: RegisterComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'reviews/:id', component: ReviewsComponent},
  {path: 'reviews/:appid/new', component: ReviewformComponent},
  {path: 'reviews/:appid/:id', component: ReviewformComponent},
  {path: 'review/:id', component: CommentsComponent},
  {path: 'profile/:id', component: ProfilesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

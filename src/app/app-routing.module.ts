import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {InLogComponent} from './in-log/in-log.component';
import {RegisterComponent} from './register/register.component';
import {DashboardComponent} from './dashboard/dashboard.component';


const routes: Routes = [
  {path: 'login', component: InLogComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'register', component: RegisterComponent},
  {path: 'dashboard', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

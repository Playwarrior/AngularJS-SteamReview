import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { UsecasesComponent } from './about/usecases/usecases.component'
import { DashboardComponent } from './core/dashboard/dashboard.component'

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'about', component: UsecasesComponent },
  { path: '**', redirectTo: '/' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

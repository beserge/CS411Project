import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SplashScreenComponent } from './splashscreen/splashscreen.component';
import { RegComponent } from './reg/reg.component';
import { MealComponent} from './meal/meal.component'
import { LoginComponent} from './login/login.component'

import { FitnessComponent} from './fitness/fitness.component'
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddComponent } from './add/add.component';

const routes: Routes = [
  {path:'splash', component: SplashScreenComponent},
  {path:'reg', component: RegComponent},
  {path:'dashboard', component: DashboardComponent},
  {path:'meal', component: MealComponent},
  {path:'login', component: LoginComponent},
  {path:'fitness', component: FitnessComponent},
  {path:'add', component: AddComponent},
  {path: '**', redirectTo: 'splash'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

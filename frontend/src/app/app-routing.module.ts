import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SplashScreenComponent } from './splashscreen/splashscreen.component';
import { RegComponent } from './reg/reg.component';
import { MealComponent} from './meal/meal.component'


const routes: Routes = [

  //{path:'home', component: Dashboard
  //},
  {path:'splash', component: SplashScreenComponent},
  {path:'reg', component: RegComponent},
  {path:'meal', component: MealComponent},
  {path: '**', redirectTo: 'splash'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

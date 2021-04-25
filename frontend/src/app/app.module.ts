import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import { RegComponent } from './reg/reg.component';
import {HttpClientModule} from '@angular/common/http';
import { MiddleService } from './service/middle.service';
import { SplashScreenComponent } from './splashscreen/splashscreen.component';
import { MealComponent } from './meal/meal.component';
import { FitnessComponent } from './fitness/fitness.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarModule } from "ng-sidebar";
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BarChartsComponent } from './bar-charts/bar-charts.component';
import { PieChartsComponent } from './pie-charts/pie-charts.component';
import { GuageChartComponent } from './guage-chart/guage-chart.component';
import { LinearGuageChartComponent } from './linear-guage-chart/linear-guage-chart.component';
import { AreaLineChartsComponent } from './area-line-charts/area-line-charts.component';
import { NumberCardChartComponent } from './number-card-chart/number-card-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    SplashScreenComponent,
    RegComponent,
    MealComponent,
    FitnessComponent,
    BarChartsComponent,
    PieChartsComponent,
    GuageChartComponent,
    LinearGuageChartComponent,
    AreaLineChartsComponent,
    NumberCardChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SidebarModule.forRoot(),
    NgxChartsModule,
    RouterModule
  ],
  providers: [MiddleService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import { RegComponent } from './reg/reg.component';
import {HttpClientModule} from '@angular/common/http';

import { SplashScreenComponent } from './splashscreen/splashscreen.component';
import { MealComponent } from './meal/meal.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './authentication.service';
import { AuthGuardService } from './auth-guard.service';

import { FitnessComponent } from './fitness/fitness.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Sidebar, SidebarModule } from "ng-sidebar";
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BarChartsComponent } from './bar-charts/bar-charts.component';
import { PieChartsComponent } from './pie-charts/pie-charts.component';
import { GuageChartComponent } from './guage-chart/guage-chart.component';
import { LinearGuageChartComponent } from './linear-guage-chart/linear-guage-chart.component';
import { AreaLineChartsComponent } from './area-line-charts/area-line-charts.component';
import { NumberCardChartComponent } from './number-card-chart/number-card-chart.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    SplashScreenComponent,
    RegComponent,
    MealComponent,
    LoginComponent,
    FitnessComponent,
    DashboardComponent,
    BarChartsComponent,
    PieChartsComponent,
    GuageChartComponent,
    LinearGuageChartComponent,
    AreaLineChartsComponent,
    NumberCardChartComponent,
    AddComponent,
    EditComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SidebarModule.forRoot(),
    NgxChartsModule,
    RouterModule,
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }

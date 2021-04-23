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
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
@NgModule({
  declarations: [
    AppComponent,
    SplashScreenComponent,
    RegComponent,
    MealComponent,
    FitnessComponent,
    AddComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
  ],
  providers: [MiddleService],
  bootstrap: [AppComponent]
})
export class AppModule { }

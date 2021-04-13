import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import { RegComponent } from './reg/reg.component';
import {HttpClientModule} from '@angular/common/http';
import { MiddleService } from './service/middle.service';
@NgModule({
  declarations: [
    AppComponent,
    RegComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [MiddleService],
  bootstrap: [AppComponent]
})
export class AppModule { }

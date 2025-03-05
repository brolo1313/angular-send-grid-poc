import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmailFormComponent } from './email-form/email-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SendGridService } from './services/send-grid.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    EmailFormComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [SendGridService],
  bootstrap: [AppComponent]
})
export class AppModule { }

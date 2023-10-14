import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {ModalModule} from 'ngx-bootstrap/modal'
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PessoasService } from './pessoas.service';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    HttpClientModule   

  ],
  providers: [
    PessoasService,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

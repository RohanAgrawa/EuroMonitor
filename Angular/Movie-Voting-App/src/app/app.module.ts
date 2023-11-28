import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MovieComponent } from './components/movie/movie.component';
import {MovieService} from "./services/movie.service";
import {MovieDataService} from "./services/movie-data.service";


@NgModule({
  declarations: [
    AppComponent,
    MovieComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [MovieService, MovieDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import {Component, DoCheck, OnChanges, OnInit, SimpleChanges} from '@angular/core';

import {Movie} from "../../models/movie.model";
import {MovieService} from "../../services/movie.service";

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css',
})

export class MovieComponent implements OnInit, DoCheck{

  public movies : Movie[];


  constructor(private movieService : MovieService) {
  }


  public ngOnInit() : void {
    this.movies = this.movieService.getMovies();
  }

  public ngDoCheck(): void {
    this.movies = this.movieService.getMovies();
  }

  onVoteUnVote(index : number){
    this.movieService.updateVote(index);
  }
}

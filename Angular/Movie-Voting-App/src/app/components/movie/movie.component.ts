import {Component, OnInit} from '@angular/core';

import {Movie} from "../../models/movie.model";
import {MovieService} from "../../services/movie.service";

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css',
})

export class MovieComponent implements OnInit{

  public movies : Movie[];


  constructor(private movieService : MovieService) {
  }
  public ngOnInit() : void {
    this.movies = this.movieService.getMovies();
    this.movieService.changedMovies.subscribe(
      (movies : Movie[])=>{
        this.movies = movies;
      }
    )
  }

  onVoteUnVote(index : number){
    this.movieService.updateVote(index);
  }


}

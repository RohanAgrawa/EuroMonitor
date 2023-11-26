import {Component, OnInit} from '@angular/core';
import {MovieService} from "../../services/movie.service";
import {Movie} from "./movie.model";

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css',
  providers : [MovieService]
})

export class MovieComponent implements OnInit{

  public movies : Movie[];


  constructor(private movieService : MovieService) {
  }
  ngOnInit() {
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

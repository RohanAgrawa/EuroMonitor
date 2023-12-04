import {Movie} from "../models/movie.model";
import {EventEmitter, Injectable} from "@angular/core";
import {MovieDataService} from "./movie-data.service";

@Injectable()
export class MovieService{

  private readonly movies : Movie[];


  constructor(private movieData : MovieDataService) {
    this.movies = this.movieData.getMovieData();
  }
  public getMovies() : Movie[] {
    return this.movies.slice();
  }

  public updateVote(index : number){
    this.movies[index].isVoted = !this.movies[index].isVoted;
  }
}

import {Movie} from "../models/movie.model";
import {Injectable} from "@angular/core";

export class MovieDataService{
  private movies : Movie[] = [
    new Movie("https://m.media-amazon.com/images/M/MV5BZDUzNDFiNWYtMzQ1MC00Y2VmLTg2OWEtZmU5N2NlNjdiNTYzXkEyXkFqcGdeQXVyMTUzNTgzNzM0._V1_.jpg", "Kisi ka Bhai Kisi ki Jaan"),
    new Movie("https://m.media-amazon.com/images/M/MV5BYjExNmRiNjgtNjBlNy00YmIwLTg5NmYtZmM2ZDlhYjZiYmI4XkEyXkFqcGdeQXVyMTA3MDk2NDg2._V1_.jpg", "Selfee"),
    new Movie("https://m.media-amazon.com/images/M/MV5BYjZjZTA3YzMtZDY2My00MDRkLWE0OWItZGVkNzA2ODljNzZiXkEyXkFqcGdeQXVyMTQ3Mzk2MDg4._V1_.jpg", "Shehzada"),
    new Movie("https://m.media-amazon.com/images/M/MV5BOTQ5ZjAxYWEtOWQxOC00MDg3LWEyYmUtOGIyYjk1MjgyNWNlXkEyXkFqcGdeQXVyMTQ3Mzk2MDg4._V1_.jpg", "Adipurush"),
  ];

  public getMovieData() : Movie[]{
    return this.movies;
  }
}

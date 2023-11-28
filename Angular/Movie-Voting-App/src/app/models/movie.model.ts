export class Movie{

  moviePosterUrl : string;
  isVoted : boolean = false;
  movieName : string;
  constructor(moviePosterUrl : string, movieName : string) {
    this.moviePosterUrl = moviePosterUrl;
    this.movieName = movieName;
  }


}

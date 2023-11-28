export class Movie{

  public moviePosterUrl : string;
  public isVoted : boolean = false;
  public movieName : string;
  constructor(moviePosterUrl : string, movieName : string) {
    this.moviePosterUrl = moviePosterUrl;
    this.movieName = movieName;
  }


}

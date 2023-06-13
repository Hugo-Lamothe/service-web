import {Component, OnInit} from '@angular/core';
import {FilmService} from "../services/film.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  movies: any | undefined;
  buttonText: string = "Like";
  listId: any = [];

  constructor(private filmService: FilmService) { }

  ngOnInit() {
    this.filmService.getMoviesById().subscribe(
      (response: any) => {
        this.movies = response;
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addLike(){
    console.log(this.listId.includes(this.movies.id))
    if (!this.listId.includes(this.movies.id)){
      console.log("post")
      this.filmService.postLike(true, this.movies.id)
      this.listId.push(this.movies.id)
      if (this.buttonText == 'Like') {
        this.buttonText = 'Unlike'
      }
    } else{
      console.log("put")
      this.filmService.putLike(this.movies.id)
      if (this.buttonText == 'Unlike') {
        this.buttonText = 'Like'
      }else{
        this.buttonText = 'Unlike'
      }
    }
  }

  protected readonly localStorage = localStorage;
}

import {Component, OnInit} from '@angular/core';
import {FilmService} from "../services/film.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  movies: any[] | undefined;

  constructor(private filmService: FilmService) { }

  ngOnInit() {
    this.filmService.getMoviesById().subscribe(
      (response: any) => {
        this.movies = response.results;
        console.log(this.movies);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  protected readonly localStorage = localStorage;
}

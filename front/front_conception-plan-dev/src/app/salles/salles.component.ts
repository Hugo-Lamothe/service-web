import {Component, OnInit} from '@angular/core';
import {FilmService} from "../services/film.service";



@Component({
  selector: 'app-salles',
  templateUrl: './salles.component.html',
  styleUrls: ['./salles.component.css']
})
export class SallesComponent implements OnInit {
  movies: any[] | undefined;

  constructor(private filmService: FilmService) { }

  ngOnInit() {
    this.filmService.getMovies().subscribe(
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

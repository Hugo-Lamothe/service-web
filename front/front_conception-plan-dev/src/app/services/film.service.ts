import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {error} from "@angular/compiler-cli/src/transformers/util";
import {Observable, Subscription} from "rxjs";
import fetch from 'node-fetch';


@Injectable({
  providedIn: 'root'
})
export class FilmService {
  private apiKey = '3ad20806dd6673838f3398e667ddb5fa';

  constructor(
    private http: HttpClient
  ) { }

  getMovies() {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}`;
    return this.http.get(url);
  }

  getMoviesById(){
    const id = localStorage.getItem('film');
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${this.apiKey}`;
    return this.http.get(url);
  }

  postLike(like: boolean, idFilm: number){
    const url = "http://localhost:3000/film";
    return this.http.post(url,{"idFilm": idFilm, "like": like} ).subscribe((response) => {
      console.log(response);
      // Gérez la réponse ici
    }, (error) => {
      console.error(error);
      // Gérez les erreurs ici
    });
  }

  putLike(idFilm: number){
    const url = "http://localhost:3000/film";
    return this.http.put(url,{"idFilm": idFilm} ).subscribe((response) => {
      console.log(response);
      // Gérez la réponse ici
    }, (error) => {
      console.error(error);
      // Gérez les erreurs ici
    });
  }

  /*getLike(idFilm: number){
    const url = "http://localhost:3000/film";
    const requestBody = {
      "idFilm": idFilm,
    };

      const httpOptions = {
        params: new HttpParams({ fromObject: requestBody })
      };
    return this.http.get(url, httpOptions).subscribe((response) => {
      console.log(response);
      // Gérez la réponse ici
    }, (error) => {
      console.error(error);
      // Gérez les erreurs ici
    });
  }*/
  /*async getLike(idFilm: number) {
    const url = "http://localhost:3000/film";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({"idFilm": idFilm}),
    });
    return response.json();
  }*/

}

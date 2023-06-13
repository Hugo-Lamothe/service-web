import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {error} from "@angular/compiler-cli/src/transformers/util";
import {Subscription} from "rxjs";
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

}

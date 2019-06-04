import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, RequestOptionsArgs, URLSearchParams } from '@angular/http';
import { map } from 'rxjs/operators';
import {FilmModele} from '../model/film-modele';

@Injectable({
  providedIn: 'root'
})
export class FilmapiService {
  private baseUrl: string = "https://api.themoviedb.org/3";
  private apikey : string = "d8e846a3e21931a74415bfd0cbc2aa60";

  constructor(private http: Http) {
    console.log("Hello FilmapiProvider Provider");
  }

  private getURLParams():URLSearchParams{
    console.log("test1")
    const params: URLSearchParams = new URLSearchParams();
    params.set('api_key', this.apikey);
    return params;
  }

  getList(selection: string, page = '0'){
    console.log("test2")
    const params = this.getURLParams();
    params.set("page", page);
    const reqOptions: RequestOptionsArgs = {
      params: params
    }
    console.log(page);
    return this.http.get(this.baseUrl+`/movie/${selection}`, reqOptions)
      .pipe(map(response =>  response.json().results as FilmModele[]));
  }

  searchFilm(term: string, page = '0'): Observable<FilmModele[]>{
    console.log("test3")
    const params = this.getURLParams();
    params.set("query", term);
    params.set("page", page);
    const reqOptions: RequestOptionsArgs = {
      params: params
    }
    return this.http.get(this.baseUrl+"/search/movie", reqOptions)
      .pipe(map(response =>  response.json().results as FilmModele[]));
  }

  getFilmDetails(id: string) : Observable<FilmModele>{
    console.log("test4")
    const params = this.getURLParams();
    params.set('append_to_response','videos');
    const reqOptions: RequestOptionsArgs = {
      params: params
    }

    return this.http.get(this.baseUrl+`/movie/${id}`, reqOptions)
      .pipe(map(response =>  response.json() as FilmModele));
  }
}

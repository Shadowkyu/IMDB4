import { Injectable } from '@angular/core';
import {FilmModele} from '../model/film-modele';
import { Storage } from '@ionic/storage'

const FILM_KEY = "movie_";


@Injectable({
  providedIn: 'root'
})
export class FavoriService {

  
  constructor(private storage: Storage) {
    console.log("Hello UserPreferencesProvider Provider");
  }
 
  addFavoriteFilm(film: FilmModele) {
    this.storage.set(this.getFilmKey(film), JSON.stringify(film));
  }
 
  removeFavoriteFilm(film: FilmModele) {
    this.storage.remove(this.getFilmKey(film));
  }
 
  isFavoriteFilm(film: FilmModele) {
    return this.storage.get(this.getFilmKey(film));
  }
 
  toogleFavoriteFilm(film: FilmModele) {
    this.isFavoriteFilm(film).then(
      isFavorite =>
        isFavorite
          ? this.removeFavoriteFilm(film)
          : this.addFavoriteFilm(film)
    ) .catch((error:any) => {
      console.log("Error don't take isfavoriteFilm")
    })
  }
 
  getFilmKey(film: FilmModele) {
    return FILM_KEY + film.id.toString();
  }
 
  getFavoriteFilms(): Promise<FilmModele[]> {
    return new Promise(resolve => {
      let results: FilmModele[] = [];
      this.storage
        .keys()
        .then(keys =>
          keys
            .filter(key => key.includes(FILM_KEY))
            .forEach(key =>
              this.storage.get(key).then(data => results.push(JSON.parse(data))).catch((error:any) => {
                console.log("Error get json")
              })
            )
        )
        .catch((error:any) => {
          console.log("Error get Favorite Film")
        })
      resolve(results);
    });
  }

}

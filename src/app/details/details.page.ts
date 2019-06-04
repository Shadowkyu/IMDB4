import { FilmapiService } from '../services/filmapi.service';
import { FavoriService } from '../services/favori.service';
import { Subscription } from 'rxjs';
import { NavParams } from '@ionic/angular';

import { Component, OnInit } from '@angular/core';
import { FilmModele } from '../model/film-modele';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  film:FilmModele;
  isFavorite: boolean = false;
  favorite: boolean = false;
    
  private filmSub: Subscription;
  constructor(
    private navParams: NavParams,
    private filmapiProvider:FilmapiService,
    private favoriteProvider : FavoriService
  ) {
  }

  ionViewDidLoad() {
    const id = this.navParams.get('id');
    this.filmSub = this.filmapiProvider.getFilmDetails(id)
    .subscribe(film => this.film = film);
  }

  ngOnDestroy(): void {
      if(this.filmSub){
        this.filmSub.unsubscribe();
      }
  }

  ionViewDidLoadFavorite() {
    this.film = this.navParams.get("movie");
    return this.favoriteProvider
      .isFavoriteFilm(this.film)
      .then(value => (this.favorite = value));
  }
 
  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
    this.favoriteProvider.toogleFavoriteFilm(this.film);
  }


  ngOnInit() {
  }

}

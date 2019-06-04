import { Component } from '@angular/core';
import { NavController} from '@ionic/angular';
import { FavoriService } from '../services/favori.service';
import { DetailsPage } from '../details/details.page';
import { Tab1Page } from '../tab1/tab1.page';
import { FilmModele } from '../model/film-modele';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  favoriteFilms: FilmModele[] = [];

  constructor(
    public navCtrl: NavController,
    private favoriteProvider: FavoriService
  ) {}
 
  ionViewDidLoad() {

  }
 
  ionViewWillEnter() {
    this.initFavoriteFilms();
  }
 
  private initFavoriteFilms() {
    this.favoriteProvider
      .getFavoriteFilms()
      .then(favs => (this.favoriteFilms = favs))
      .catch((error:any) => {
        console.log("Error get Favorite Film")
      });
  }

  findMovie() {
    this.navCtrl.navigateForward['/Tab1Page'];
  }
 
 goToDetails(id: string) {
    this.navCtrl.navigateForward['/DetailsPage'], { id: id };
  }
}

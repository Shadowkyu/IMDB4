import { FilmapiService } from '../services/filmapi.service';
/*import { MovieDetailPage } from './movie-detail/movie-detail';*/
import { Component, ViewChild, OnDestroy } from '@angular/core';
import { IonContent, NavController, NavParams } from '@ionic/angular';
import { Subject, Subscription } from 'rxjs';
import { DetailsPage } from '../details/details.page';
//import { Camera, CameraOptions } from '@ionic-native/camera';
import {FilmModele} from '../model/film-modele';


import 'rxjs/operators';
import { switchMap, debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  filmSearch$: Subject<string> = new Subject<string>();
  filmSelection = "popular";
  endPages: boolean = false;

  private lastSearch: string;

  films: FilmModele[] = [];

  private page: number = 0;
  private subscription: Subscription;


  @ViewChild(IonContent) content: IonContent;

  constructor(
    public navCtrl: NavController,
    //private camera: Camera,
    private filmapiservice: FilmapiService,
  ) {}

  getSelection(selection: string) {
    this.reset();
    this.filmSearch$.next(selection);
  }

  private reset(){
    this.page = 0;
    this.films = [];
    this.endPages = false;
    this.content.scrollToTop(200);
  }

  /*CameraPhoto(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
  
    this.camera.getPicture(options).then((imageData) => {
    let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
    });
  }*/

  searchFilm(search: string) {
    this.reset();
    this.filmSearch$.next(search);
  }

  ionViewDidLoad() {
    this.subscription = this.filmSearch$
      .pipe(debounceTime(400))
      .pipe(switchMap((search: string) => {
        search = !!!search ? this.filmSelection : search;

        const searchOpt: boolean =
          search === "now_playing" ||
          search === "popular" ||
          search === "top_rated" ||
          search === "upcoming" ||
          !!!search
            ? true
            : false;

        this.lastSearch = search;
        this.page++;
        if (searchOpt) {
          return this.filmapiservice.getList(search, this.page.toString());
        } else {
          return this.filmapiservice.searchFilm(search, this.page.toString());
        }
      }))
      .subscribe((films: FilmModele[]) => {
        this.films = this.films.concat(films);

        console.log(this.endPages);

        if (films.length === 0) {
          this.endPages = true;
        }
      });

    setTimeout(() => this.filmSearch$.next(""), 1000);
  }

  /*goToDetails(id: string) {
    this.navCtrl.navigateForward(['/DetailsPage'], { id: id });
  }*/

  doInfinite(infiniteScroll) {
    this.filmSearch$.next(this.lastSearch);
    setTimeout(() => {
      infiniteScroll.complete();
    }, 500);
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}

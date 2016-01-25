import {App, IonicApp, IonicPlatform} from 'ionic/ionic';
import {Injectable, bind} from 'angular2/angular2';
import {Http} from 'angular2/http';

@Injectable()
export class DataService {
  constructor(app: IonicApp, http: Http) {
    this.app = app;
    this.http = http;
    this.conferenceInfo = null;
    this.slidesInfo = null;
    this.listingsInfo = null;
    this.scheduleInfo = null;
    this.categories = null;
  }

  retrieveData() {
    //Under the hood we are using Angular http service.
    //This defaults to use the HTTP_BINDING for http requests.
    //Here, we're going to get a JSON data file, use the `map` call to parse json
    // and finally subscribe to the observable and set our data
    //to the value it provides once the http request is complete.
    this.http.get('app/data/info.json')
      .map(res => res.json())
      .subscribe(data => {
        this.conferenceInfo = data;
      });

    this.http.get('app/data/slides.json')
      .map(res => res.json())
      .subscribe(data => {
        this.slidesInfo = data;
      });

    this.http.get('app/data/listings.json')
      .map(res => res.json())
      .subscribe(data => {
        this.listingsInfo = data;
      });

    this.http.get('app/data/schedule.json')
      .map(res => res.json())
      .subscribe(data => {
        this.scheduleInfo = data;
      });

    this.http.get('app/data/categories.json')
      .map(res => res.json())
      .subscribe(data => {
        this.categories = data;
      });
  }

  getData() {
    return this.conferenceInfo;
  }
  
  getSlides() {
    return this.slidesInfo;
  }

  getListings() {
    return this.listingsInfo;
  }

  getSchedule() {
    return this.scheduleInfo;
  }

  getCategories() {
    return this.categories;
  }
}
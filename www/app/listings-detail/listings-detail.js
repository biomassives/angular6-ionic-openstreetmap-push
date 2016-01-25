import {NavController, NavParams, Page} from 'ionic/ionic';
import {DataService} from '../service/data';

@Page({
  templateUrl: 'app/listings-detail/listings-detail.html',
})
export class ListingsDetailPage {
  constructor(nav: NavController, navParams: NavParams, dataService: DataService) {
    this.nav = nav;
    this.navParams = navParams;
    this.dataService = dataService;

    let listingsName = this.navParams.data;
    let listingsList = this.dataService.getListings();

    this.listings = listingsList.find( (v) => {
      if(v.name.toLowerCase().indexOf(listingsName.toLowerCase()) >= 0) {
        return true;
      }
      return false;
    });
  }
}

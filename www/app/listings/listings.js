import {NavController, Page, ActionSheet} from 'ionic/ionic';
import {DataService} from '../listings/data';
import {ListingDetailPage} from '../listing-detail/listing-detail';

@Page({
  templateUrl: 'app/listings/listings.html'
})
export class ListingsPage {
  constructor(nav: NavController, dataService: DataService, actionSheet: ActionSheet) {
    this.nav = nav;
    this.listings = null;
    this.listingsInfo = null;
    this.dataService = dataService;
    this.actionSheet = actionSheet;
  }

  onInit() {
    this.listingsInfo = this.dataService.getListings();
    let listingsList = this.listings = this.dataService.getListings();
    let talks = [];
    let listings = [];

    console.log(this.listingsInfo);

    this.talks = talks;
    this.listingsNames = listings;
  }

  openListingsDetail(listingsName) {
    this.nav.push(ListingsDetailPage, listingsName);
  }
}

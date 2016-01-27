import {Page} from 'ionic/ionic';
import {AboutPage} from '../about/about';
import {MapPage} from '../map/map';
import {SchedulePage} from '../schedule/schedule';
//import {ListingsPage} from '../listings/listings';

@Page({
  templateUrl: 'app/tabs/tabs.html'
})
export class TabsPage {
  constructor() {
    // set the root pages for each tab
    this.tab1Root = AboutPage;
  //  this.tab2Root = ListingsPage;
    this.tab2Root = MapPage;
    this.tab3Root = SchedulePage;
  }
}

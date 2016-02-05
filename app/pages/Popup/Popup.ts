import {Page, NavParams} from 'ionic-framework/ionic';


@Page({
  templateUrl: 'build/pages/Popup/Popup.html'
})
export class SessionDetailPage {
  session: any;

  constructor(private navParams: NavParams) {
    this.session = navParams.data;
  }
}

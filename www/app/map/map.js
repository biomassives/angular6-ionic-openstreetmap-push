import {Page} from 'ionic/ionic';
import {DataService} from '../service/data';

@Page({
  templateUrl: 'app/map/map.html'
})
export class MapPage {
  constructor() {
    this.map = null;
  }

  addMarkerAndInfo(latLng, infoContent, infoLink, infolinkText) {
    var infowindow = new google.maps.InfoWindow({
      content: ['<h5>', infoContent, '</h5><a href="', infoLink, '">', infolinkText, '</a>'].join('')
    });

    var marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
      title: infoContent
    });

    marker.addListener('click', function() {
      infowindow.open(this.map, marker);
    });
  }

// pass data into here from the jsonsource

  onInit() {
    var ionicHqLatLng = {lat: 35.1826179, lng: -80.9147837};
    var afterPartyLatLng = {lat: 35.1933409, lng: -80.8130002};
    var conferenceCenterLatLng = {lat: 35.204572, lng: -80.867017};

    this.map = new google.maps.Map(document.getElementById('map'), {
      center: ionicHqLatLng,
      zoom: 12
    });

    this.addMarkerAndInfo(ionicHqLatLng, 'Ionic HQ', 'google.com', 'link1');
    this.addMarkerAndInfo(conferenceCenterLatLng, 'Conference Center', 'google.com', 'link2');
    this.addMarkerAndInfo(afterPartyLatLng, 'Afterparty - Brocach Irish Pub', 'google.com', 'link3');

  }
}

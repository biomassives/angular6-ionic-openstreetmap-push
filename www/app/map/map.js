import {Page} from 'ionic/ionic';
import {DataService} from '../service/data';

@Page({
  templateUrl: 'app/map/map.html'
})
export class MapPage {
  constructor() {
    this.map = null;
  }

  addMarkerAndInfo(latLng, infoContent, infoLink, infolinkText, infoThumb) {
    var infowindow = new google.maps.InfoWindow({
      content: ['<img src="', infoThumb , '"></a><h5>', infoContent, '</h5><a href="', infoLink, '">', infolinkText, '</a>'].join('')
    });

    var marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
      title: infoContent
    });

    marker.addListener('click', function() {
      infowindow.open(this.map, marker);
    });
    marker.addListener('mouseover', function() {
      infowindow.open(this.map, marker);
    });
    marker.addListener('mouseout', function() {
      infowindow.open(this.map, marker);
    });
  //  marker.addListener('touch', function() {
  //    infowindow.open(this.map,marker);
  //  });
  }

// pass data into here from the jsonsource

  onInit() {
    var ionicHqLatLng = {lat: 35.1826179, lng: -80.9147837};
    var afterPartyLatLng = {lat: 35.1933409, lng: -80.8130002};
    var conferenceCenterLatLng = {lat: 35.204572, lng: -80.867017};
    var testLatLng = {lat: 35.232, lng: -80.87};

    this.map = new google.maps.Map(document.getElementById('map'), {
      center: ionicHqLatLng,
      zoom: 12
    });

    this.addMarkerAndInfo(ionicHqLatLng, 'Perimeter Lofts', 'google.com', 'link1','https://clickpackmove.s3.amazonaws.com/media/photos/20131230_101313_thumbnail.jpg');
    this.addMarkerAndInfo(conferenceCenterLatLng, 'Post South End', 'google.com', 'link2','https://clickpackmove.s3.amazonaws.com/media/photos/apartments-021_thumbnail.jpg');
    this.addMarkerAndInfo(afterPartyLatLng, 'Rock Creek At Ballantyne - SAVE $100 OFF YOUR MOVE IN!', 'google.com', 'link3','https://clickpackmove.s3.amazonaws.com/media/photos/Piper_Station_2_thumbnail.jpg');
    this.addMarkerAndInfo(testLatLng, 'Rock Creek At Ballantyne - SAVE $100 OFF YOUR MOVE IN!', 'google.com', 'link3','https://clickpackmove.s3.amazonaws.com/media/photos/Piper_Station_2_thumbnail.jpg');

  }
}

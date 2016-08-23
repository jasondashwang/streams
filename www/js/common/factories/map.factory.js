angular.module('main')
.factory('MapFactory', function($rootScope, $cordovaGeolocation, MediaService) {

  var MapFactory = {};
  var map;
  var markers = [];
  function clearMarkers () {
    if (markers.length) {
      for (var i = 0; i < markers.length; i++) {
        console.log(markers[i])
        markers[i].setMap(null);
      }
    }
  }

  MapFactory.drawMap = function () {
      var options = {timeout: 10000, enableHighAccuracy: true};
      $cordovaGeolocation.getCurrentPosition(options).then(function(position){
        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var styleMapType = new google.maps.StyledMapType([{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#004666"},{"visibility":"on"}]}], {name: "Imperial Map"})
        var mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeControlOptions: {
            mapTypeIds: ["imperial_map"]
          }
          
        };

        map = new google.maps.Map(document.getElementById("map"), mapOptions);
        map.mapTypes.set('imperial_map', styleMapType);
        map.setMapTypeId('imperial_map');

        var im = 'http://www.robotwoods.com/dev/misc/bluecircle.png';

        var userMarker = new google.maps.Marker({
          position: latLng,
          map: map,
          icon: im
        });

        MapFactory.drawPins();
      }, function(error){
        console.log("Could not get location");
      });
  }

  MapFactory.drawPins = function () {
      clearMarkers();
      var mediaObjects = MediaService.getPins()
      mediaObjects = mediaObjects.filter(function(el){
        return el.mediaType !== 'message'
      })      
      mediaObjects.forEach(function(el){
        var contentString, mediaIcon;
        if (el.mediaType == "video") {
          contentString = 
          `<video width="320" height="240" controls ng-if="mediaObj.mediaType == 'video'">
            <source src="` + el.mediaUrl + `">
          </video>`
          mediaIcon = 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Map_marker_icon_%E2%80%93_Nicolas_Mollet_%E2%80%93_Video_%E2%80%93_Media_%E2%80%93_Dark.png'
        } else {
          contentString = 
          `<img src ="` + el.mediaUrl + `" width='153' height='204'>`;
          mediaIcon = `https://helpx.adobe.com/content/dam/help/icons/lr_mobile_capture_widget_icon_20x20.png`
        }

        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });

        var pos = new google.maps.LatLng(el.location.coords.latitude, el.location.coords.longitude);
        var mediaMarker = new google.maps.Marker({
            position: pos,
            map: map,
            icon: mediaIcon
          });
        markers.push(mediaMarker)
        mediaMarker.addListener('click', function() {
          infowindow.open(pos, mediaMarker);
        });

      })
  }

  return MapFactory;

});


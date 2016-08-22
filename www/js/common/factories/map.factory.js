angular.module('main')
.factory('MapFactory', function($rootScope, $cordovaGeolocation) {

  var MapFactory = {};
  MapFactory.drawMap = function (mediaObjects) {
      var options = {timeout: 10000, enableHighAccuracy: true};
      $cordovaGeolocation.getCurrentPosition(options).then(function(position){

        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        var mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        var im = 'http://www.robotwoods.com/dev/misc/bluecircle.png';

        var userMarker = new google.maps.Marker({
          position: latLng,
          map: map,
          icon: im
        });

        // Draw pins
        mediaObjects.filter(function(el){
          return el.mediaType !== 'message'
        })
        console.log(mediaObjects)
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
          mediaMarker.addListener('click', function() {
            infowindow.open(pos, mediaMarker);
          });

        })

      }, function(error){
        console.log("Could not get location");
      });
  }



    
    


  return MapFactory;

});


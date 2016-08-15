'use strict';

angular.module('main').controller('MapCtrl', function ($scope, $state, $cordovaGeolocation) {
  var options = {timeout: 10000, enableHighAccuracy: true};

  $cordovaGeolocation.getCurrentPosition(options).then(function(position){

    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var im = 'http://www.robotwoods.com/dev/misc/bluecircle.png';

    var userMarker = new google.maps.Marker({
      position: latLng,
      map: $scope.map,
      icon: im
    });

  }, function(error){
    console.log("Could not get location");
  });

});


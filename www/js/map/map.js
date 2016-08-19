'use strict';

angular.module('main').controller('MapCtrl', function ($scope, $state, $cordovaGeolocation, MapFactory, MediaService) {
  console.log("in")
  $scope.$on("$ionicView.enter", function () {
    $scope.mediaObjects = MediaService.mediaObjects;
    MapFactory.drawMap($scope.mediaObjects);
  });


});


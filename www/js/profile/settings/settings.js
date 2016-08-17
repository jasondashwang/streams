'use strict';

angular.module('main').controller('SettingsCtrl', function ($scope, $state, $rootScope, CameraFactory, $cordovaCamera) {
  $scope.profile = $rootScope.profile;

  $scope.takeImage = function() {
      var options = {
          quality: 80,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.CAMERA,
          allowEdit: true,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 250,
          targetHeight: 250,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: false
      };

      $cordovaCamera.getPicture(options).then(function(imageData) {
          $scope.profile.photoUrl = "data:image/jpeg;base64," + imageData;
          CameraFactory.changeProfilePicture($scope.profile.photoUrl);
      }, function(err) {
          console.error('Camera Error', err);
      });
  };
});


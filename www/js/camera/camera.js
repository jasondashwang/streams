'use strict';

angular.module('main').controller('CameraCtrl', function ($rootScope, $scope, $state, CameraFactory, $cordovaCamera) {

  $scope.changeStatus = function () {
    $rootScope.groupLoggedIn = !($rootScope.groupLoggedIn);
  };

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
	        $scope.srcImage = "data:image/jpeg;base64," + imageData;
          CameraFactory.uploadImage($scope.srcImage);
	    }, function(err) {
	        console.error('Camera Error', err);
	    });
	};
});


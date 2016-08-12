'use strict';

angular.module('main').controller('CameraCtrl', function ($rootScope, $scope, $location, $cordovaCamera) {
  $scope.greeting = 'Camera View';
  $scope.goToState = function (state) {
    $state.go(state);
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
	    }, function(err) {
	        // error
	    });
	}

	$scope.takeImage();
});


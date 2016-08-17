'use strict';

angular.module('main').controller('CameraCtrl', function ($rootScope, $scope, $state, $cordovaCamera, GroupFactory) {

  $scope.changeStatus = function () {
    $rootScope.groupLoggedIn = !($rootScope.groupLoggedIn);
  };

  $scope.demoImage = '../../img/ben.png';
  console.log($scope.demoImage);

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
	};
});


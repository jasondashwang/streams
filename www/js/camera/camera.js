'use strict';

angular.module('main').controller('CameraCtrl', function ($rootScope, $scope, $state, $cordovaCamera) {
  $rootScope.loggedIn = false;
  $scope.changeStatus = function () {
    $rootScope.loggedIn = !($rootScope.loggedIn);
  };

  $scope.goRight = function () {
  	if ($rootScope.loggedIn) $state.go('tab.group-logged-in');
  		else $state.go("tab.group-logged-out");
  };

  $scope.demoImage = '../../img/ben.png';
  console.log($scope.demoImage);

  $scope.saveImage = function() {
    console.log('hello');
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
	};
});


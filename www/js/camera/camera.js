'use strict';

angular.module('main').controller('CameraCtrl', function ($rootScope, $scope, $state, $cordovaCamera, GroupFactory) {
  $rootScope.loggedIn = false;
  $scope.changeStatus = function () {
    $rootScope.loggedIn = !($rootScope.loggedIn);
  };

  $scope.goRight = function () {
  	if ($rootScope.loggedIn) $state.go('tab.group-logged-in');
  		else $state.go("tab.group-logged-out");
  };

  $scope.demoImage = 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSnfpzoD-_HTIGH37ncMqaYiqjOI4MrXSPSTCyAHbJdSsc6O9vP';

  $scope.saveImage = function() {
      GroupFactory.uploadImage($scope.demoImage)
      .then($state.go('tab.camera'))
      .catch(err => console.error(err));
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


'use strict';


angular.module('main').controller('CameraCtrl', function ($rootScope, $scope, $state, CameraFactory, $cordovaCapture, $cordovaCamera, Upload, $q) {

	$scope.getLocation = function() {
		var location = $q.defer()
		CameraFactory.getLocation()
			.then(function(res){
				location.resolve(res)
			})
			.catch(function(err){
				location.reject(err)
			})
		return location.promise;
	}
	$scope.getLocation();




 $scope.isInGroup = function() {
	if ($rootScope.profile) 
		return $rootScope.profile.activeCode;
  };

// add error handlers for capture methods
	$scope.captureImage = function() {

	    var options = {
	      limit: 1
	    };
	    $scope.getLocation()
	    	.then(function(position){
	    		return position;
	    	})
	    	.then(function(position){
			    $cordovaCapture.captureImage(options).then(function(imageData) {
				    console.log("Raw output", imageData[0]);
					toDataUrl(imageData[0].fullPath, function(base64Img){
						CameraFactory.uploadMedia(base64Img, "photo", position)
					})
			    });
	    	})
	    	.catch(function(err){
	    		console.error(err)
	    	})


	};


    $scope.captureVideo = function() {
	    var options = {
	      limit: 1
	    };
	    $scope.getLocation()
	    	.then(function(position){
	    		return position;
	    	})
	    	.then(function(position){
			    $cordovaCapture.captureVideo(options).then(function(videoData) {
					toDataUrl(videoData[0].fullPath, function(base64Img){
						CameraFactory.uploadMedia(base64Img, "video", position)
					})
			    });
	    	})
	    	.catch(function(err){
	    		console.error(err)
	    	})
    };

	function toDataUrl(url, callback) {
		var xhr = new XMLHttpRequest();
		xhr.responseType = 'blob';
		xhr.onload = function() {
			var reader = new FileReader();
			reader.onloadend = function() {
			  callback(reader.result);
			}
			reader.readAsDataURL(xhr.response);
		};
		xhr.open('GET', url);
		xhr.send();
	}

	// $ionicModal.fromTemplateUrl('js/camera/cameraModal.html', {
	// 	scope: $scope,
	// 	animation: 'slide-in-up'
	// }).then(function(modal) {
	// 	$scope.modal = modal;
	// });
	// $scope.openModal = function() {
	// 	$scope.modal.show();
	// };
	// $scope.closeModal = function() {
	// 	$scope.modal.hide();
	// };
	// // Cleanup the modal when we're done with it!
	// $scope.$on('$destroy', function() {
	// 	$scope.modal.remove();
	// });
	// // Execute action on hide modal
	// $scope.$on('modal.hidden', function() {
	// 	// Execute action
	// });
	// // Execute action on remove modal
	// $scope.$on('modal.removed', function() {
	// 	// Execute action
	// });

});

angular.module('main').filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);


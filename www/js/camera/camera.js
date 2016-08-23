'use strict';


angular.module('main').controller('CameraCtrl', function ($rootScope, $scope, $state, CameraFactory, $cordovaCapture, $cordovaCamera, Upload, $q, $ionicHistory) {

	$ionicHistory.nextViewOptions({
	    disableBack: true
	 });

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
			    $cordovaCapture.captureImage(options)
			    .then(function(imageData) {
					toDataUrl(imageData[0].fullPath, function(base64Img){
						CameraFactory.storeMedia(base64Img, "photo", position)
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
			    $cordovaCapture.captureVideo(options)
			    .then(function(videoData) {
					toDataUrl(videoData[0].fullPath, function(base64Img){
						CameraFactory.storeMedia(base64Img, "video", position)
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

});

angular.module('main').filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);


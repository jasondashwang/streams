'use strict';

angular.module('main').controller('TabsCtrl', function ($rootScope, $scope, $state, CameraFactory, $cordovaCapture, $cordovaCamera, Upload, $q) {
      $scope.isLoggedIn = function(){
        return $rootScope.isLoggedIn;
      };

      $scope.goToGroup = function(){
        if($rootScope.profile.activeCode) $state.go('tab.group-logged-in');
        else $state.go('tab.group-logged-out');
      };
    
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
		console.log('hi')
	    var options = {
	      limit: 1
	    };
	    $scope.getLocation()
	    	.then(function(position){
	    		return position;
	    	})
	    	.then(function(position){
			    $cordovaCapture.captureImage(options).then(function(imageData) {
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
			    $cordovaCapture.captureVideo(options).then(function(videoData) {
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
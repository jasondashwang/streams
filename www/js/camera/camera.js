'use strict';

angular.module('main').controller('CameraCtrl', function ($rootScope, $scope, $state, CameraFactory, $cordovaCapture, $cordovaCamera, Upload) {

	$scope.changeStatus = function () {
		$rootScope.groupLoggedIn = !($rootScope.groupLoggedIn);
	};

	$scope.captureImage = function() {
	    var options = {
	      limit: 1
	    };
	    $cordovaCapture.captureImage(options).then(function(imageData) {
		    console.log("Raw output", imageData[0]);
			toDataUrl(imageData[0].fullPath, function(base64Img){
				CameraFactory.uploadMedia(base64Img, "photo")
			})
	    });

	};

    $scope.captureVideo = function() {
        var options = {
        	limit: 1
        };

        $cordovaCapture.captureVideo(options).then(function(videoData) {
			toDataUrl(videoData[0].fullPath, function(base64Img){
				CameraFactory.uploadMedia(base64Img, "video")
			})
            // CameraFactory.uploadImage($scope.srcImage);
        }, function(err) {
            console.error('Camera Error', err);
        });
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


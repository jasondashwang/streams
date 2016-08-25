'use strict';


angular.module('main').controller('CameraCtrl', function ($rootScope, $scope, $state, CameraFactory, $ionicHistory) {

	$scope.$on("$ionicView.enter", function () {
		$ionicHistory.nextViewOptions({
		    disableBack: true
		 });
	});

	$scope.captureImage = function() {
		CameraFactory.captureMedia("image");
	};

    $scope.captureVideo = function() {
    	CameraFactory.captureMedia("video");
    };

});



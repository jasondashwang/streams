'use strict';

angular.module('main').controller('CameraCtrl', function ($rootScope, $scope, $state, $cordovaCamera, CameraFactory, $ionicModal) {

  $scope.changeStatus = function () {
    $rootScope.groupLoggedIn = !($rootScope.groupLoggedIn);
  };

  $scope.isInGroup = function() {
		if ($rootScope.profile) return $rootScope.profile.activeCode;
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


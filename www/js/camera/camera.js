'use strict';

angular.module('main').controller('CameraCtrl', function ($rootScope, $scope, $state, $cordovaCamera, Upload) {

  $scope.changeStatus = function () {
    $rootScope.groupLoggedIn = !($rootScope.groupLoggedIn);
  };

  $scope.uploadImage = function(imageData) {
    if (!$rootScope.profile) return;

    var file = Upload.dataUrltoBlob(imageData, $rootScope.profile.uid);
    var uploadPic = storageRef.child('pictures/' + file.name).put(file);

    uploadPic.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      function(snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      }, function(err) {
        console.error(err);
      }, function() {
        // Upload completed successfully, now we can get the download URL
        var downloadURL = uploadPic.snapshot.downloadURL;
        $scope.result = downloadURL;
        firebase.database().ref().child('users').child(name).child('photoUrl').set(downloadURL);
    });

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
          $scope.uploadImage($scope.srcImage);
	    }, function(err) {
	        console.error('Camera Error', err);
	    });
	};
});


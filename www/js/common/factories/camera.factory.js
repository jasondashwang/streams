angular.module('main')
.factory('CameraFactory', function($rootScope, Upload) {

  var CameraFactory = {};

  var ref = firebase.database().ref();

  CameraFactory.uploadImage = function(imageData) {
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
        // $scope.result = downloadURL;
        // firebase.database().ref().child('groups/' + $rootScope.SOMEGROUPID).child('photoUrl').set(downloadURL);
    });
  };

  return CameraFactory;

});

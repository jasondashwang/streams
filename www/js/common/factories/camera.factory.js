angular.module('main')
.factory('CameraFactory', function($rootScope, Upload, $cordovaGeolocation, $q) {

  var CameraFactory = {};

  var ref = firebase.database().ref();

  CameraFactory.uploadMedia = function(mediaData, type, location) {
    if (!$rootScope.profile) return;

    var file = Upload.dataUrltoBlob(mediaData, Date.now());
    var uploadPic = storageRef.child('pictures/' + file.name).put(file);

    uploadPic.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      function(snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        // leave in here for compression/speed testing
        console.log('Upload is ' + progress + '% done');

      }, function(err) {
        console.error(err);
      }, function() { 
        var downloadURL = uploadPic.snapshot.downloadURL;
        var mediaObj = {
          mediaUrl: downloadURL,
          mediaType: type,
          memberId: $rootScope.profile.uid,
          location: location
        }
        //stores a reference to the download URL in the group's db
        ref.child('groups/' + $rootScope.profile.activeCode + '/media/' + Date.now()).set(mediaObj);
    });
  };
  
  // consider moving to new factory 
  CameraFactory.getLocation = function () {
    var options = {timeout: 10000, enableHighAccuracy: true};
    // var positionObj = $q.defer()
    return $cordovaGeolocation.getCurrentPosition(options)
      .then(function(position){   
        return position;
        // positionObj.resolve(position)
      })

  }

  CameraFactory.changeProfilePicture = function(imageData) {
    if (!$rootScope.profile) return;

    var file = Upload.dataUrltoBlob(imageData, $rootScope.profile.uid);
    var uploadPic = storageRef.child('profilePictures/' + file.name).put(file);

    uploadPic.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      function(snapshot) {
      }, function(err) {
        console.error(err);
      }, function() {
        // Upload completed successfully, now we can get the download URL
        var downloadURL = uploadPic.snapshot.downloadURL;
        //stores a reference to the download URL in the group's db
        ref.child('users/' + $rootScope.profile.uid + '/photoUrl').set(downloadURL);
    });


  };


  return CameraFactory;

});

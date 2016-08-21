angular.module('main')
.factory('CameraFactory', function($rootScope, Upload, $cordovaGeolocation, $q, $state, CameraService) {

  var CameraFactory = {};

  var ref = firebase.database().ref();

  CameraFactory.storeMedia = function(mediaData, type, location) {
    var mediaObj = {
        mediaUrl: mediaData,
        mediaType: type,
        memberId: "test",
        location: location,
        timeStamp: Date.now(),
        upvotes: 0
    }
    CameraService.media = mediaObj;

    $state.go('tab.send-media')


  };

  CameraFactory.sendMedia = function(groupCodes, media){

    var file = Upload.dataUrltoBlob(media.mediaUrl, Date.now());
    var uploadPic = storageRef.child('media/' + file.name).put(file);

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
        media.mediaUrl = downloadURL;
        groupCodes.forEach(function(code){
          console.log(code)
          ref.child('groupCollages/' + code + '/' + media.timeStamp).set(media);
        })

      });


  }

  // consider moving to new factory
  CameraFactory.getLocation = function () {
    var options = {timeout: 10000, enableHighAccuracy: true};
    // var positionObj = $q.defer()
    return $cordovaGeolocation.getCurrentPosition(options)
      .then(function(position){
        return position;
        // positionObj.resolve(position)
      })

  };

  CameraFactory.changeGroupPicture = function(imageData, groupCode) {

    var file = Upload.dataUrltoBlob(imageData, groupCode);
    var uploadPic = storageRef.child('groupProfilePictures/' + file.name).put(file);

    uploadPic.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      function(snapshot) {
      }, function(err) {
        console.error(err);
      }, function() {
        // Upload completed successfully, now we can get the download URL
        var downloadURL = uploadPic.snapshot.downloadURL;
        //stores a reference to the download URL in the group's db
        ref.child('groups/' + groupCode + '/mediaUrl').set(downloadURL);
    });
  };

  CameraFactory.changeProfilePicture = function(imageData, userId) {

    var file = Upload.dataUrltoBlob(imageData, userId);
    var uploadPic = storageRef.child('profilePictures/' + file.name).put(file);

    uploadPic.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      function(snapshot) {
      }, function(err) {
        console.error(err);
      }, function() {
        // Upload completed successfully, now we can get the download URL
        var downloadURL = uploadPic.snapshot.downloadURL;
        //stores a reference to the download URL in the group's db
        ref.child('users/' + userId + '/photoUrl').set(downloadURL);
    });

  };


  return CameraFactory;

});

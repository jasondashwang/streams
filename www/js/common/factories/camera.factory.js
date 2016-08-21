angular.module('main')
.factory('CameraFactory', function($rootScope, Upload, $cordovaGeolocation, $q, $state, CameraService, AuthService) {

  var CameraFactory = {};

  var ref = firebase.database().ref();

  CameraFactory.storeMedia = function(mediaData, type, location) {
    AuthService.getLoggedInUser()
    .then(function(user){
      var mediaObj = {
          mediaUrl: mediaData,
          mediaType: type,
          member: {
            id: user.uid,
            name: user.name
          },
          location: location,
          timeStamp: Date.now(),
          upvotes: 0
      }
      CameraService.media = mediaObj;

      $state.go('tab.send-media')
    })



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
        
        var lastMessage;
     
        if (media.mediaType == "photo") {
          lastMessage = {
            message: media.member.name + " sent a photo",
            timeStamp: media.timeStamp
          }
        } else {
          lastMessage = {
            message: media.member.name + " sent a video",
            timeStamp: media.timeStamp
          }
        } 
        
        var downloadURL = uploadPic.snapshot.downloadURL;
        media.mediaUrl = downloadURL;
        groupCodes.forEach(function(code){
          // set the last message for a group
          ref.child('groups/' + code + '/lastMessage').set(lastMessage)

          // store the reference
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

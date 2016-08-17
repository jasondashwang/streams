angular.module('main')
.factory('CameraFactory', function($rootScope) {

  var CameraFactory = {};

  var ref = firebase.database().ref();

  CameraFactory.uploadImage = function(image) {

      var storageRef = firebase.storage().ref();
      var imageRef = storageRef.child('picture.jpg');
      var pictureImageRef = storageRef.child('images/picture.jpg');
      var file = Upload.dataUrltoBlob(image, 'picture.jpg');

      var uploadPic = storageRef.child('pictures/' + file.name).put(file);

      // Listen for state changes, errors, and completion of the upload.
      uploadPic.on(firebase.storage.TaskEvent.STATE_CHANGED, function(snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        }, function(error) {
          console.error(error);
      }, function() {
        // Upload completed successfully, now we can get the download URL
        var downloadURL = uploadPic.snapshot.downloadURL;
        return downloadURL;

        // var newPictureKey = ref.child('groups').child('groupCollage').push().key;

        // firebase.database().ref('groups/' + $rootScope.groupId + '/groupCollage/' + newPictureKey).set({
        //   pictureUrl: downloadURL,
        //   location: 'some location',
        //   owner: $rootScope.profile
        // });
      });
  };

  return CameraFactory;

});

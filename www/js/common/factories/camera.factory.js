angular.module('main')
.factory('CameraFactory', function() {

  var CameraFactory = {};

  const ref = firebase.database().ref();

  CameraFactory.uploadImage = function(image) {

      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child('picture.jpg');
      const pictureImageRef = storageRef.child('images/picture.jpg');
      const file = Upload.dataUrltoBlob(image, 'picture.jpg');

      const uploadPic = storageRef.child('pictures/' + file.name).put(file);

      // Listen for state changes, errors, and completion of the upload.
      uploadPic.on(firebase.storage.TaskEvent.STATE_CHANGED, function(snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        }, function(error) {
          console.error(error);
      }, function() {
        // Upload completed successfully, now we can get the download URL
        const downloadURL = uploadPic.snapshot.downloadURL;

        const newPictureKey = ref.child('groups').child('groupCollage').push().key;

        firebase.database().ref(`groups/${$rootScope.groupId}/groupCollage/${newPictureKey}`).set({
          pictureUrl: downloadURL,
          location: 'some location',
          owner: $rootScope.userId
        });
      });
  };

  return CameraFactory;

});

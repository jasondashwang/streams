angular.module('main')
.factory('GroupFactory', function (Upload) {

  const GroupFactory = {};

  const user = firebase.auth().currentUser;

  const ref = firebase.database().ref();

  GroupFactory.uploadImage = function(image) {
    console.log(image);
    console.log('hopefully this is defined', Upload);
    const file = Upload.urlToBlob(image);
    console.log('file defined', file);

    const uploadPic = storageRef.child('pictures/' + file.name).put(file);

    // Listen for state changes, errors, and completion of the upload.
    uploadPic.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      function(snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      }, function(error) {
        console.log(error);
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
  }

  GroupFactory.createGroup = function (groupDetails) {
    const groupPostData = {
      name: groupDetails.name,
      members: {
        userId: user.uid,
        color: 'blue'
      }
    };

    // get a new key for the group
    const newGroupKey = ref.child('groups').push().key;

    const updates = {};
    updates[`/groups/${newGroupKey}`] = groupPostData;
    updates[`/users/${user.uid}`] = {isLeader: true, currentGroup: groupDetails.name};

    return firebase.database().ref().update(updates);
  };

  return GroupFactory;
});

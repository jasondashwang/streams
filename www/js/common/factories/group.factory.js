angular.module('main')
.factory('GroupFactory', function ($q) {

  const GroupFactory = {};

  const user = firebase.auth().currentUser;
  const ref = firebase.database().ref();


  GroupFactory.createGroup = function (groupDetails) {
    const groupPostData = {
      name: groupDetails.name,
      members: {},
      active: true,
      groupCode: Math.floor(Math.random() * (101))
    };

    groupPostData.members[user.uid] = {color: "blue"}

    // get a new key for the group
    const newGroupKey = ref.child('groups').push().key;

    const updates = {};
    updates[`/groups/${newGroupKey}`] = groupPostData;
    updates[`/users/${user.uid}`] = {isLeader: true, currentGroup: newGroupKey};

    return firebase.database().ref().update(updates);
  };

  // GroupFactory.uploadImage = function(image) {
  //     console.log(image);
  //     console.log('hopefully this is defined', Upload);
  //     const file = Upload.dataUrltoBlob(image, 'somePicName');
  //     console.log('file defined', file);

  //     const uploadPic = storageRef.child('pictures/' + file.name).put(file);

  //     // Listen for state changes, errors, and completion of the upload.
  //     uploadPic.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
  //       function(snapshot) {
  //         // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  //         var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //         console.log('Upload is ' + progress + '% done');
  //       }, function(error) {
  //         console.log(error);
  //     }, function() {
  //       // Upload completed successfully, now we can get the download URL
  //       const downloadURL = uploadPic.snapshot.downloadURL;

  //       const newPictureKey = ref.child('groups').child('groupCollage').push().key;

  //       firebase.database().ref(`groups/${$rootScope.groupId}/groupCollage/${newPictureKey}`).set({
  //         pictureUrl: downloadURL,
  //         location: 'some location',
  //         owner: $rootScope.userId
  //       });
  //     });
  //   };

  GroupFactory.addMember = function (groupCode) {
    var groupRef = ref.child('groups/' + groupCode + '/members/' + user.uid);
    return groupRef.update({color: 'green'});

  };

  GroupFactory.fetchCurrentGroup = function () {

    var codeRef = ref.child('users/' + user.uid + '/currentGroup');
    var groupCode = $q.defer();
    codeRef.on('value', function(snapshot){
      groupCode.resolve(snapshot.val());

    }, function (errorObject) {
      groupCode.reject(errorObject.code);
      console.log("The read failed: " + errorObject.code);
    });

    var userGroupRef = $q.defer();
    groupCode.promise
    .then(function(groupId){
      ref.child('groups/' + groupId).on('value', function(snapshot){
        userGroupRef.resolve(snapshot.val());
      }, function(errorObject){
        userGroupRef.reject(errorObject.code);
      })
    })

    return userGroupRef.promise;
  };

  return GroupFactory;
});

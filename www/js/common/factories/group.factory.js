angular.module('main')
.factory('GroupFactory', function ($q) {

  var GroupFactory = {};

  var user = firebase.auth().currentUser;
  var ref = firebase.database().ref();

  GroupFactory.createGroup = function (groupDetails) {
    const groupPostData = {
      name: groupDetails.name,
      members: {},
      active: true,
      groupCode: Math.floor(Math.random() * (101))
    };

    groupPostData.members[user.uid] = {color: "blue"};

    // get a new key for the group
    const newGroupKey = ref.child('groups').push().key;

    const updates = {};
    updates[`/groups/${newGroupKey}`] = groupPostData;
    updates[`/users/${user.uid}`] = {isLeader: true, currentGroup: newGroupKey};

    return firebase.database().ref().update(updates);
  };

  GroupFactory.hello = function() {
    console.log('hello');
  };

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

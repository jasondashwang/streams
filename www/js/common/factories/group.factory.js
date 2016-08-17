angular.module('main').factory('GroupFactory', function ($q, $rootScope, $firebaseObject) {

  const GroupFactory = {};
  const alphanumeric_unique = function () {
      return Math.random().toString(36).split('').filter( function(value, index, self) {
          return self.indexOf(value) === index;
      }).join('').substr(2,6);
  };

  // const user = $rootScope.profile;
  const ref = firebase.database().ref();

  GroupFactory.createGroup = function (groupDetails) {

    // get a new key for the group

    const newGroupKey = alphanumeric_unique();
    // const newGroupKey = ref.child('groups').push().key;

    const groupPostData = {
      name: groupDetails.name,
      members: {},
      active: true,
      media: {},
      leaderId: $rootScope.profile.uid,
      createTime: Date.now()
    };


    $rootScope.profile.activeCode = newGroupKey;
    groupPostData.members[$rootScope.profile.uid] = $rootScope.profile;
    const updates = {};
    updates[`/groups/${newGroupKey}`] = groupPostData;
    $rootScope.profile.isLeader = true;
    updates[`/users/${$rootScope.profile.uid}`] = $rootScope.profile;

    return firebase.database().ref().update(updates);
  };

  GroupFactory.addMember = function (groupCode) {
    var groupRef = ref.child('groups/' + groupCode + '/members/' + $rootScope.profile.uid);
    $rootScope.profile.activeCode = groupCode;
    return groupRef.update($rootScope.profile);
  };

  GroupFactory.fetchCurrentGroup = function () {
    var userGroupRef = $q.defer();
    ref.child('groups/' + $rootScope.profile.activeCode).on('value', function(snapshot){
          userGroupRef.resolve(snapshot.val());
        }, function(errorObject){
          userGroupRef.reject(errorObject.code);
        });
      return userGroupRef.promise;
  };

  GroupFactory.fetchMedia = function () {
    var mediaObjects = $q.defer();
    ref.child('groups/' + $rootScope.profile.activeCode + '/media').on('value', function(snapshot){
      mediaObjects.resolve(snapshot.val());
    }, function(errorObject){
      mediaObjects.reject(errorObject.code);
    });
    return mediaObjects.promise;
  };

  GroupFactory.leaveGroup = function() {
    let currentActiveCode = $rootScope.profile.activeCode;
    let updates = {};
    updates[`/pastGroups/${$rootScope.profile.group.createTime}`] = currentActiveCode;

      firebase.database().ref('/users/' + $rootScope.profile.uid).update(updates);

      $rootScope.profile.activeCode = null;
      $rootScope.profile.isLeader = false;
    };

  GroupFactory.endGroup = function() {

    let currentActiveCode = $rootScope.profile.activeCode;

    $rootScope.profile.activeCode = null;
    $rootScope.profile.isLeader = false;

    let userUpdates = {};
    userUpdates['/isLeader'] = false;
    userUpdates['/activeCode'] = null;
    firebase.database().ref(`/users/${$rootScope.profile.uid}`).update(userUpdates);

    let members = Object.keys($rootScope.profile.group.members);
    for (let i = 0; i < members.length; i++) {
      userUpdates = {};
      userUpdates[`/pastGroups/${$rootScope.profile.group.createTime}`] = currentActiveCode;
      firebase.database().ref('/users/' + members[i]).update(userUpdates);
    }

    let groupUpdate = {};
    groupUpdate[`/active`] = false;
    firebase.database().ref('/groups/' + currentActiveCode).update(groupUpdate);


  };

  return GroupFactory;
});


angular.module('main').factory('FirebaseGroup', function($q, $rootScope, $firebaseObject){
  return function (activeCode){
    return $firebaseObject(firebase.database().ref('groups').child(activeCode));
  };
});

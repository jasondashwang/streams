angular.module('main')
.factory('GroupFactory', function ($q, $rootScope) {

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
      leaderId: $rootScope.profile.uid
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
    console.log('The profile ', $rootScope.profile)
    ref.child('groups/' + $rootScope.profile.activeCode + '/media').on('value', function(snapshot){
      mediaObjects.resolve(snapshot.val());
    }, function(errorObject){
      mediaObjects.reject(errorObject.code);
    })
    return mediaObjects.promise;
  };

  return GroupFactory;
});

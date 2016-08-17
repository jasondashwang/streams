angular.module('main')
.factory('GroupFactory', function ($q, $rootScope) {

  const GroupFactory = {};

  // const user = $rootScope.profile;
  const ref = firebase.database().ref();

  
  GroupFactory.createGroup = function (groupDetails) {
    const groupPostData = {
      name: groupDetails.name,
      members: {},
      active: true,
      groupCode: Math.floor(Math.random() * (101))
    };

    // get a new key for the group
    const newGroupKey = ref.child('groups').push().key;
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
    return groupRef.update($rootScope.profile)
  };

  GroupFactory.fetchCurrentGroup = function () {
  var userGroupRef = $q.defer();
  ref.child('groups/' + $rootScope.profile.activeCode).on('value', function(snapshot){
        userGroupRef.resolve(snapshot.val());
      }, function(errorObject){
        userGroupRef.reject(errorObject.code);
      })
    return userGroupRef.promise
  };

  return GroupFactory;
});

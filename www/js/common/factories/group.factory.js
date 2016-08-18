'use strict';

angular.module('main').factory('GroupFactory', ['$q', '$rootScope', function ($q, $rootScope) {

  var GroupFactory = {};
  var alphanumeric_unique = function () {
      return Math.random().toString(36).split('').filter( function(value, index, self) {
          return self.indexOf(value) === index;
      }).join('').substr(2,6);
  };

  // const user = $rootScope.profile;
  var ref = firebase.database().ref();

  GroupFactory.createGroup = function (groupDetails) {

    // get a new key for the group

    var newGroupKey = alphanumeric_unique();
    // const newGroupKey = ref.child('groups').push().key;

    var groupPostData = {
      name: groupDetails.name,
      members: {},
      active: true,
      media: {},
      leaderId: $rootScope.profile.uid,
      createTime: Date.now()
    };


    $rootScope.profile.activeCode = newGroupKey;
    groupPostData.members[$rootScope.profile.uid] = $rootScope.profile;
    var updates = {};
    updates['/groups/' + newGroupKey] = groupPostData;
    $rootScope.profile.isLeader = true;
    updates['/users/' + $rootScope.profile.uid] = $rootScope.profile;

    return firebase.database().ref().update(updates);
  };

  GroupFactory.addMember = function (groupCode) {
    var returnValue = $q.defer();
    ref.child('groups/' + groupCode + '/active').on('value', function(snapshot){
      if(snapshot.val()){
        ref.child('users/' + $rootScope.profile.uid + '/activeCode').set(groupCode);
        var groupRef = ref.child('groups/' + groupCode + '/members/' + $rootScope.profile.uid);
        $rootScope.profile.activeCode = groupCode;

        returnValue.resolve(groupRef.update($rootScope.profile));
      } else {
        returnValue.reject('Inactive Group!');
      }
    }, function(err){
      returnValue.reject(err);
    });

    return returnValue.promise;
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
    var currentActiveCode = $rootScope.profile.activeCode;
    var updates = {};
    updates['/pastGroups/' + $rootScope.profile.group.createTime] = currentActiveCode;
    updates['/activeCode'] = null;

    firebase.database().ref('/users/' + $rootScope.profile.uid).update(updates);

    $rootScope.profile.activeCode = null;
    $rootScope.profile.isLeader = false;
    $rootScope.profile.group = null;
    };

  GroupFactory.endGroup = function() {

    var currentActiveCode = $rootScope.profile.activeCode;

    $rootScope.profile.activeCode = null;
    $rootScope.profile.isLeader = false;
    $rootScope.profile.group = null;

    var userUpdates = {};
    userUpdates['/isLeader'] = false;
    userUpdates['/activeCode'] = null;
    firebase.database().ref('/users/' + $rootScope.profile.uid).update(userUpdates);

    var members = Object.keys($rootScope.profile.group.members);
    for (var i = 0; i < members.length; i++) {
      userUpdates = {};
      userUpdates['/pastGroups/' + $rootScope.profile.group.createTime] = currentActiveCode;
      userUpdates['/activeCode'] = null;
      firebase.database().ref('/users/' + members[i]).update(userUpdates);
    }

    var groupUpdate = {};
    groupUpdate['/active'] = false;
    firebase.database().ref('/groups/' + currentActiveCode).update(groupUpdate);


  };

  return GroupFactory;
}]);

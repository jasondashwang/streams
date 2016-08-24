'use strict';

angular.module('main').service('GroupService', function($q, GroupSession, $rootScope, $firebaseAuth, $firebaseObject, AuthService){
  var ref = firebase.database().ref();
  var self = this;

  function getFirebaseGroup(groupCode) {
    return $firebaseObject(ref.child('groups/' + groupCode));
  }

  function getFirebaseGroupCollage(groupCode){
    return $firebaseObject(ref.child('groupCollages/' + groupCode));
  }

  function getFirebaseUser(uid){
    return $firebaseObject(ref.child('users/' + uid));
  }

  this.getCurrentGroups = function(){
    return AuthService.getLoggedInUser()
    .then(function(user){
      for(var code in user.groups){
        if(!(GroupSession.groups[code])){
          var firebaseGroup = getFirebaseGroup(code);
          GroupSession.addGroup(firebaseGroup, code);
        }
      }
      for(var code in GroupSession.groups){
        if(!(user.groups) || !(user.groups[code])) GroupSession.removeGroup(code);
      }
      return $q.when(GroupSession.groups);
    });
  };

  this.getGroup = function(groupCode, fromServer){
    if(fromServer){
      return $q.when(getFirebaseGroup(groupCode));
    } else if(GroupSession.groups[groupCode]) return $q.when(GroupSession.groups[groupCode]);
    else {
      return self.getCurrentGroups()
      .then(function(){
        return $q.when(GroupSession.groups[groupCode]);
      });
    }
  };

  this.getGroupCollage = function(groupCode){
    if(!GroupSession.groupCollages[groupCode]) {
      GroupSession.groupCollages[groupCode] = getFirebaseGroupCollage(groupCode);
      return $q.when(GroupSession.groupCollages[groupCode]);
    } else {
      return $q.when(GroupSession.groupCollages[groupCode]);
    }
  };

  this.removeGroup = function(groupCode){
    GroupSession.removeGroup(groupCode);
  };

  this.getGroupMembers = function(groupCode){
    if(!(GroupSession.groupMembers[groupCode])) GroupSession.groupMembers[groupCode] = {groupCode: groupCode, members: {}};
    for(var uid in GroupSession.groups[groupCode].members){
      if(!GroupSession.groupMembers[groupCode].members[uid]){
        var firebaseUser = getFirebaseUser(uid);
        GroupSession.addGroupMember(firebaseUser, uid, groupCode);
      }
    }

    return $q.when(GroupSession.groupMembers[groupCode].members);

  };


});


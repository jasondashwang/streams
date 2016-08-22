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

  this.getCurrentGroups = function(){
    return AuthService.getLoggedInUser()
    .then(function(user){
      for(var code in user.groups){
        if(!(GroupSession[code])){
          var firebaseGroup = getFirebaseGroup(code);
          GroupSession.addGroup(firebaseGroup, code);
        }
      }
      return $q.when(GroupSession.groups);
    });
  };

  this.getGroup = function(groupCode){
    if(GroupSession.groups[groupCode]) return $q.when(GroupSession.groups[groupCode]);
    else {
      return self.getCurrentGroups()
      .then(function(){
        return $q.when(GroupSession.groups[groupCode]);
      });
    }
  }

  this.getGroupCollage = function(groupCode){
    if(!GroupSession.groupCollages[groupCode]) {
      GroupSession.groupCollages[groupCode] = getFirebaseGroupCollage(groupCode);
      return $q.when(GroupSession.groupCollages[groupCode]);
    } else {
      return $q.when(GroupSession.groupCollages[groupCode]);
    }
  };

  this.getGroupMembers = function(groupCode){

  };


});


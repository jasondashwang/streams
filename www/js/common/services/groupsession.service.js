angular.module('main').service('GroupSession', function(){
  var self = this;

  this.groups = {};

  this.addGroup = function(group, groupCode){
    this.groups[groupCode] = group;
  };

  this.removeGroup = function(groupCode){
    delete this.groups[groupCode];
  };

  this.destroy = function(){
    this.groups = {};
    this.groupMembers = {};
    this.groupCollages = {};
  };

  this.groupCollages = {};

  this.addGroupCollage = function(groupCollage, groupCode){
    this.groupCollages[groupCode] = groupCollage;
  };

  this.removeGroupCollage = function(groupCode){
    delete this.groupCollages[groupCode];
  };

  this.groupMembers = {};

  this.addGroupMember = function(groupMember, uid, groupCode){
    this.groupMembers[groupCode].members[uid] = groupMember;
  };

  this.removeGroupMembers = function(groupCode){
    delete this.groupMembers[groupCode];
  };

});

angular.module('main').service('GroupSession', function(){
  var self = this;

  this.groups = {};

  this.addGroup = function(group, groupCode){
    this.groups[groupCode] = group;
  };

  this.removeGroup = function(groupCode){
    delete this.groups[groupCode];
    delete this.groupCollages[groupCode];
    delete this.groupMembers[groupCode];
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

  this.groupMembers = {};

  this.addGroupMember = function(groupMember, uid, groupCode){
    this.groupMembers[groupCode].members[uid] = groupMember;
  };


});

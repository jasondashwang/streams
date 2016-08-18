'use strict';

angular.module('main').service('Session', function(){
  var self = this;

  this.profile = null;

  this.create = function(uid, user){
    this.profile = user;
    this.profile.uid = uid;
  };

  this.destroy = function(){
    this.profile = null;
  };

});

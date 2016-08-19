'use strict';

angular.module('main').service('Session', function(){
  var self = this;

  this.profile = null;

  this.create = function(user){
    this.profile = user;
  };

  this.destroy = function(){
    this.profile = null;
  };

});

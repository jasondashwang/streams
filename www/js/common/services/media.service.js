'use strict';

angular.module('main').service('MediaService', function(){
  var self = this;
  this.mediaObjects = null;
  this.get = function() {
  	return self.mediaObjects;
  }
  this.set = function (mediaObjects) {
  	self.mediaObjects = mediaObjects;
  }
  this.destroy = function () {
  	self.mediaObjects = null;
  }
  
});

'use strict';

angular.module('main').service('MediaService', function(){
  this.mediaObjects = null;
  this.get = function() {
  	return this.mediaObjects;
  }
  this.set = function (mediaObjects) {
  	this.mediaObjects = mediaObjects;
  }
  this.destroy = function () {
  	this.mediaObjects = null;
  }
  
});

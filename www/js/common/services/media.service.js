'use strict';

angular.module('main').service('MediaService', function($rootScope){
  this.mediaObjects = null;
  this.pins = null;
  this.get = function() {
  	return this.mediaObjects;
  }
  this.set = function (mediaObjects) {
  	this.mediaObjects = mediaObjects;
    this.setPins(mediaObjects)
  }
  this.destroy = function () {
  	this.mediaObjects = null;
  }
  this.setPins = function(pins) {
    this.pins = pins;
  }
  this.getPins = function() {
    return this.pins;
  }

});

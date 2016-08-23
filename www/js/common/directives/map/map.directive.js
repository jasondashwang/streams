'use strict';

angular.module('main').directive('map', function (MapFactory, MediaService) {
  return {
    restrict: 'E',
    templateUrl: "js/common/directives/map/map.html",
    scope: {

    },
    link: function(scope, elem, attrs) {
		  MapFactory.drawMap();
      scope.toggle = {
        photo: true,
        video: true,
        location: true

      };
      scope.togglePins = function() {
        var getPins = MediaService.get()
        var pins = [];
        getPins.forEach(function(pin){
          pins.push(pin)
        })
        pins = pins.filter(function(el){
          return el.mediaType !== 'message' && scope.toggle[el.mediaType]
        })
        MediaService.setPins(pins);
        MapFactory.drawPins();
      }
    }
  };
});

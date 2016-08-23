'use strict';

angular.module('main').directive('map', function (MapFactory) {
  return {
    restrict: 'E',
    templateUrl: "js/common/directives/map/map.html",
    scope: {

    },
    link: function(scope, elem, attrs) {
		  MapFactory.drawMap();
    }
  };
});

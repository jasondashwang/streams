'use strict';

angular.module('main').directive('media', function () {
  return {
    restrict: 'E',
    scope: {
      mediaObjects: '=',
      members: '='
    },
    link: function (scope, elem){
    	scope.mediaArray = [];
    	for (var obj in scope.mediaObjects) {
			if (scope.mediaObjects[obj] && scope.mediaObjects[obj].mediaType) 
    		scope.mediaArray.push(scope.mediaObjects[obj]);
    	}
    	console.log(scope.mediaArray)
    },
    templateUrl: 'js/common/directives/media/media.html'
  };
});

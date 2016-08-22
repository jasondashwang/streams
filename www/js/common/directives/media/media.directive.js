'use strict';

angular.module('main').directive('media', function () {
  return {
    restrict: 'E',
    scope: {
      mediaObjects: '='
    },
    link: {
    	mediaObjects: function(scope){
    		return scope.mediaObjects;
    	}
    },
    templateUrl: 'js/common/directives/media/media.html'
  };
});

'use strict';

angular.module('main').directive('media', function () {
  return {
    restrict: 'E',
    scope: {
      mediaObjects: '=',
      members: '='
    },
    templateUrl: 'js/common/directives/media/media.html'
  };
});

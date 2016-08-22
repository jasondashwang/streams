'use strict';

angular.module('main').directive('chat', function () {
  return {
    restrict: 'E',
    scope: {
      mediaObjects: '='
    },
    templateUrl: 'js/common/directives/chat/chat.html'
  };
});

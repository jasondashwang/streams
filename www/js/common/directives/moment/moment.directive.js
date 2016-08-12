'use strict';

angular.module('main').directive('moment', function () {
  return {
    restrict: 'E',
    scope: {
      model: '='
    },
    templateUrl: 'js/common/directives/moment/moment.html'
  };
});

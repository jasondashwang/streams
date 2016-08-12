'use strict';
angular.module('main').controller('CameraCtrl', function ($rootScope, $scope, $state) {
  $scope.greeting = 'Camera View';
  $scope.goToState = function (state) {
    $state.go(state);
  };
});


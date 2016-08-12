'use strict';
angular.module('main').controller('CameraCtrl', function ($rootScope, $scope, $state) {
  $rootScope.loggedIn = false;
  $scope.greeting = 'Camera View';
  $scope.changeStatus = function () {
    $rootScope.loggedIn = !($rootScope.loggedIn);
  };
});


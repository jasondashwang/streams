'use strict';

angular.module('main').controller('GroupLoggedOutCtrl', function ($scope, $location) {
  $scope.goToState = function (state) {
    $state.go(state);
  };
  $scope.goLeft = function () {
  	$location.url('/tab/camera')
  }
});


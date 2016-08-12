'use strict';

angular.module('main').controller('GroupLoggedOutCtrl', function ($scope) {
  $scope.goToState = function (state) {
    $state.go(state);
  };
});


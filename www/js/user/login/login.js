'use strict';

angular.module('main')
.controller('LoginCtrl', function ($scope, $state, $log, UserFactory) {

  $scope.login = function(userInfo) {
    $scope.error = null;

    UserFactory.login(userInfo)
    .then(() => $state.go('tab.camera'))
    .catch(err => $scope.error = err);
  };

});

'use strict';

angular.module('main')
.controller('SignupCtrl', function ($scope, $state, $log, UserFactory) {

  $scope.signUp = function(userInfo) {
    $scope.error = null;
    UserFactory.createUser(userInfo)
    .then(() => $state.go('tab.camera'))
    .catch(err => $scope.error = err);

  };
});


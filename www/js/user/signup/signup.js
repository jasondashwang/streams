'use strict';

angular.module('main')
.controller('SignupCtrl', function ($scope, $state, $log, UserFactory) {
  $scope.signUp = function(userInfo) {
    UserFactory.createUser(userInfo)
    .then(() => $state.go('tab.camera'))
    .catch($log.error);
  };
});


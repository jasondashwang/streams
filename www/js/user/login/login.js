'use strict';

angular.module('main')
.controller('LoginCtrl', function ($scope, $state, $log, Auth) {

  $scope.login = function(userInfo) {
    UserFactory.login(userInfo)
    .then(() => $state.go('tab.camera'))
    .catch($log.error);
  };

});

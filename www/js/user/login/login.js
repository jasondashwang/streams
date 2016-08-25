'use strict';

angular.module('main')
.controller('LoginCtrl', ['$scope', '$state', '$log', 'AuthService', function ($scope, $state, $log, AuthService) {

  $scope.login = function(userInfo) {
    AuthService.login(userInfo.email, userInfo.password)
    .then(function(user){
      $state.go('tab.profile');
    })
    .catch(function(err){
      $.growl.error({location: 'br', message: err.message});
    });
  };
}]);

'use strict';

angular.module('main')
.controller('LoginCtrl', ['$scope', '$state', '$log', 'AuthService', '$rootScope', function ($scope, $state, $log, AuthService, $rootScope) {

  if($rootScope.isLoggedIn){
    $state.go('tab.profile');
  }

  $scope.login = function(userInfo) {
    $scope.error = null;
    AuthService.login(userInfo.email, userInfo.password)
    .then(function(user){
      $state.go('tab.profile');
    })
    .catch(function(err){
      $.growl.error({location: 'br', message: err.message});
    });
  };
}]);

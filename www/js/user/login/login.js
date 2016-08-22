'use strict';

angular.module('main')
.controller('LoginCtrl', ['$scope', '$state', '$log', 'AuthService', '$rootScope', function ($scope, $state, $log, AuthService, $rootScope) {


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

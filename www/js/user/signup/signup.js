'use strict';

angular.module('main').controller('SignupCtrl', ['$scope', '$state', '$log', 'AuthService', '$rootScope', function ($scope, $state, $log, AuthService, $rootScope) {

  $scope.signUp = function(userInfo) {
    $scope.error = null;
    AuthService.signup(userInfo)
    .then(function(user){
      $state.go('tab.profile');
    })
    .catch(function(err){
      $.growl.error({location: 'br', message: err.message});
    });
  };
}]);


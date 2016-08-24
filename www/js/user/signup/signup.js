'use strict';

angular.module('main').controller('SignupCtrl', ['$scope', '$state', '$log', 'AuthService', function ($scope, $state, $log, AuthService) {

  $scope.signUp = function(userInfo) {
    $scope.error = null;
    AuthService.signup(userInfo)
    .then(function(){
      $state.go('tab.profile');
    })
    .catch(function(err){
      $.growl.error({location: 'br', message: err.message});
    });
  };
}]);


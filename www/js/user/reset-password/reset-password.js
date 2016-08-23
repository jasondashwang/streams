'use strict';

angular.module('main')
.controller('ResetPasswordCtrl', ['$scope', '$state', '$log', 'AuthService', function ($scope, $state, $log, AuthService) {

  var auth = firebase.auth();

  $scope.resetPass = function(userInfo) {
    auth.sendPasswordResetEmail(userInfo.email)
      .then(function() {
        $.growl.notice({location: 'br', message: 'A reset link was sent to ' + userInfo.email});
        $state.go('tab.profile');
      })
      .catch(function(err) {
        $.growl.error({location: 'br', message: err.message});
      });
  };
}]);

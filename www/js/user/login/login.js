'use strict';

angular.module('main')
.controller('LoginCtrl', function ($scope, $state, $log, Auth) {

  $scope.login = function(userInfo) {
      $scope.error = null;
      Auth.$signInWithEmailAndPassword(userInfo.email, userInfo.password)
          .then(function(user) {
              $state.go('tab.camera');
              console.log('Logged in as:', user.uid);
          }).catch(function(err) {
              console.log('Authentication failed:', err);
          });
  };

});

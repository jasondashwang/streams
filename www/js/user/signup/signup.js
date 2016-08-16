'use strict';

angular.module('main')
.controller('SignupCtrl', function ($scope, $state, $log, Auth) {

  $scope.signUp = function(userInfo) {
    $scope.error = null;
    Auth.$createUserWithEmailAndPassword(userInfo.email, userInfo.password)
      .then(function(userData) {
          console.log("User " + userData.uid + " created successfully!");
          return Auth.$signInWithEmailAndPassword(
              userInfo.email, userInfo.password
          );
      }).then(function(authData) {
          $state.go('tab.camera');
          console.log("Logged in as:", authData.uid);
      }).catch(function(error) {
          $scope.error = error;
          console.error("Error: ", error);
      });

  };
});


'use strict';

angular.module('main')
.controller('SignupCtrl', function ($scope, $state, $log, Auth, UserFactory) {

  $scope.signUp = function(userInfo) {
    $scope.error = null;
    Auth.$createUserWithEmailAndPassword(userInfo.email, userInfo.password)
      .then(function(userData) {
        console.log("User " + userData.uid + " created successfully!");
        UserFactory.addUser(userData.uid, userInfo.name, userInfo.email, userInfo.phone);
      })
      .then(function() {
        Auth.$signInWithEmailAndPassword(
            userInfo.email, userInfo.password
        );
      })
      .then(function(authData) {
          $state.go('tab.camera');
      })
      .catch(function(error) {
          $scope.error = error;
          console.error("Error: ", error);
      });

  };
});


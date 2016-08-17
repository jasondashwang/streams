'use strict';

angular.module('main')
.controller('LoginCtrl', function ($scope, $state, $log, Auth, $rootScope, UserFactory) {

  $scope.login = function(userInfo) {
    var uid;
      $scope.error = null;
      Auth.$signInWithEmailAndPassword(userInfo.email, userInfo.password)
        .then(function(user) {
            $rootScope.loggedIn = true;
            uid = user.uid;
            return user.uid;
        })
        .then(function(userId){
          return UserFactory.getUser(userId);
        })
        .then(function(user){
          $rootScope.profile = user;
          $rootScope.profile.uid = uid;
          console.log($rootScope.profile)
          $state.go('tab.camera');
        })
        .catch(function(err) {
              console.log('Authentication failed:', err);
        });
  };

});

'use strict';

angular.module('main').controller('SignupCtrl', ['$scope', '$state', '$log', 'Auth', 'UserFactory', '$rootScope', function ($scope, $state, $log, Auth, UserFactory, $rootScope) {

  $scope.signUp = function(userInfo) {
    var uid;
    $scope.error = null;
    userInfo.photoUrl = "http://www.rogerbrayrestoration.com/wp-content/uploads/2014/08/Blank-Profile.jpg";
    Auth.$createUserWithEmailAndPassword(userInfo.email, userInfo.password)
      .then(function(userData) {
        uid = userData.uid;
        UserFactory.addUser(userData.uid, userInfo.name, userInfo.email, userInfo.phone, userInfo.photoUrl);
      })
      .then(function() {
        Auth.$signInWithEmailAndPassword(
            userInfo.email, userInfo.password
        );
      })
      .then(function() {
          $rootScope.loggedIn = true;
          return UserFactory.getUser(uid);

      })
      .then(function(user){
        $rootScope.profile = user;
        $rootScope.profile.uid = uid;
        $state.go('tab.profile');
      })
      .catch(function(error) {
          $scope.error = error;
          console.error("Error: ", error);
      });

  };
}]);


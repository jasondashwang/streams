'use strict';

angular.module('main').controller('ProfileCtrl', ['$scope', '$state', '$rootScope', 'AuthService', '$cordovaSQLite', function ($scope, $state, $rootScope, AuthService, $cordovaSQLite) {

    $scope.logOut = function(){
      AuthService.logout();
      $state.go('tab.login');
      $scope.loggedIn = false;
    };


    $scope.$on("$ionicView.enter", function () {
      if (!$scope.loggedIn) {
        AuthService.getLoggedInUser()
        .then(function(user){
          user.$bindTo($scope, 'profile');
          $scope.loggedIn = true;
        });  
      }
     
    });
}]);


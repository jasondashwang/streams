'use strict';

angular.module('main').controller('ProfileCtrl', ['$scope', '$state', '$rootScope', 'AuthService', '$cordovaSQLite', function ($scope, $state, $rootScope, AuthService, $cordovaSQLite) {
    var unbind, fireBaseObj;
    $scope.logOut = function(){
      AuthService.logout();
      $state.go('tab.login');      
      $scope.loggedIn = false;
      if (unbind) unbind();
      fireBaseObj.$destroy();
    };


    $scope.$on("$ionicView.enter", function () {
      if (!$scope.loggedIn) {
        AuthService.getLoggedInUser()
        .then(function(user){
          fireBaseObj = user;
          $scope.loggedIn = true;
          return user.$bindTo($scope, 'profile')
        })
        .then(function(ub){
          unbind = ub;
        })
      }
     
    });
}]);


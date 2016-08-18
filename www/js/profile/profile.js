'use strict';

angular.module('main').controller('ProfileCtrl', ['$scope', '$state', '$rootScope', 'AuthService', function ($scope, $state, $rootScope, AuthService) {
    AuthService.getLoggedInUser()
    .then(function(user){
      $scope.profile = user;
    })
    .catch(function(err){
      console.log(err);
    });

    $scope.logOut = function(){
      AuthService.logout();
      $state.go('tab.login');
    };
}]);


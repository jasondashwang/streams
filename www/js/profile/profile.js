'use strict';

angular.module('main').controller('ProfileCtrl', ['$scope', '$state', '$rootScope', 'AuthService', '$cordovaSQLite', function ($scope, $state, $rootScope, AuthService, $cordovaSQLite) {

    $scope.logOut = function(){
      AuthService.logout();
      $state.go('tab.login');
    };



    $scope.$on("$ionicView.enter", function () {
      AuthService.getLoggedInUser()
      .then(function(user){
        user.$bindTo($scope, 'profile');
      });
    });
}]);


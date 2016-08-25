angular.module("main").controller('TabsCtrl' , function ($scope, $state, $rootScope, $cordovaCamera, $firebase, $rootScope) {

      $scope.isLoggedIn = function(){
        return $rootScope.isLoggedIn;
      };

    })
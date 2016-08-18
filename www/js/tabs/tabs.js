angular.module("main").controller('TabsCtrl' , function ($scope, $state, $rootScope, $cordovaCamera, $firebase) {

      $scope.isLoggedIn = function(){
        return $rootScope.isLoggedIn;
      };

      $scope.goToGroup = function(){
        if($rootScope.profile.activeCode) $state.go('tab.group-logged-in');
        else $state.go('tab.group-logged-out');
      };
    })
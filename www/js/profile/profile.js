'use strict';

angular.module('main').controller('ProfileCtrl', function ($scope, $state, $rootScope) {
  $scope.profile = $rootScope.profile;

  $scope.logOut = function(){
    $rootScope.loggedIn = false;
    $rootScope.groupLoggedIn = false;
    $rootScope.profile = undefined;
    $state.go('tab.login');
  };
});


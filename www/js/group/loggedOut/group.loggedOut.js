'use strict';

angular.module('main').controller('GroupLoggedOutCtrl', function ($rootScope, $location, $scope) {
  if($rootScope.loggedIn){
    $scope.goToState('tab.group-logged-in');
  }

});


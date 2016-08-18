'use strict';

angular.module('main').controller('ProfileCtrl', ['$scope', '$state', '$rootScope', function ($scope, $state, $rootScope) {
  if(!($rootScope.loggedIn)){
    $rootScope.loggedIn = false;
    $state.go('tab.login');
  } else {
 	 $scope.profile = $rootScope.profile;
  }

  $scope.logOut = function(){
    $rootScope.loggedIn = false;
    $rootScope.groupLoggedIn = false;
    $rootScope.profile = undefined;
    $state.go('tab.login');
  };

}]);


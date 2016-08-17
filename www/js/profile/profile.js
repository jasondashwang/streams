'use strict';

angular.module('main').controller('ProfileCtrl', function ($scope, $state, $rootScope, FirebaseGroup, FirebaseProfile) {
  if(!($rootScope.loggedIn)){
    $rootScope.loggedIn = false;
    $state.go('tab.login');
  } else {
 	 $scope.profile = $rootScope.profile;
    if($rootScope.profile.activeCode){
      FirebaseGroup($rootScope.profile.activeCode).$bindTo($rootScope, "profile.group");
    }
    FirebaseProfile($rootScope.profile.uid).$bindTo($rootScope, "profile");
  }

  $scope.logOut = function(){
    $rootScope.loggedIn = false;
    $rootScope.groupLoggedIn = false;
    $rootScope.profile = undefined;
    $state.go('tab.login');
  };

});


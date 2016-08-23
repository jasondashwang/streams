angular.module("main").controller('TabsCtrl' , function ($scope, $state, $rootScope, $cordovaCamera, $firebase, $rootScope) {


      $scope.isLoggedIn = function(){
        return $rootScope.isLoggedIn;
      };

      $rootScope.$on('hideTabs', function() {
	  	$scope.hidden = true;
	  })


      $scope.goToGroup = function(){
        if($rootScope.profile.activeCode) $state.go('tab.group-logged-in');
        else $state.go('tab.group-logged-out');
      };
    })
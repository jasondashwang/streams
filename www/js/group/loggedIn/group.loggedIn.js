'use strict';

angular.module('main').controller('GroupLoggedInCtrl', function ($scope, $state, GroupFactory, $log, FirebaseGroup, $rootScope) {
	GroupFactory.fetchCurrentGroup()
	.then(function(group){
    $scope.profile.group = group;
    FirebaseGroup($rootScope.profile.activeCode).$bindTo($rootScope, "profile.group");
	});

  $scope.leaveGroup = function(){
    if($rootScope.profile.isLeader) alert('You are leader! Transfer to someone else!');
    else {
      GroupFactory.leaveGroup()
      .then(function(){
        $state.go('tab.profile');
      });
    }
  };

  $scope.endGroup = function(){
    GroupFactory.endGroup()
    $state.go('tab.profile');
  };
});


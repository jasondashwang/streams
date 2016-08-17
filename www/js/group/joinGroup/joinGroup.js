'use strict';

angular.module('main').controller('JoinGroupCtrl', function ($scope, $state, GroupFactory, FirebaseGroup) {
	$scope.joinGroup = function (leaderEmail) {
		GroupFactory.addMember(leaderEmail)
    .then(function(){
      return FirebaseGroup($rootScope.profile.activeCode).$bindTo($rootScope, "profile.group");

    })
    .then(function(){
      $state.go('tab.group-logged-in');
    })
    .catch(function(err){
      console.log(err);
    });
	};
});


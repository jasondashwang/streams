'use strict';

angular.module('main').controller('JoinGroupCtrl', function ($scope, $state, GroupFactory) {
	$scope.joinGroup = function (leaderEmail) {
		GroupFactory.addMember(leaderEmail)
    .then(function(){
      $state.go('tab.group-logged-in');
    })
    .catch(function(err){
      console.log(err);
    });
	};
});


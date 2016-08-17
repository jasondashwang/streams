'use strict';

angular.module('main').controller('JoinGroupCtrl', function ($scope, $state, GroupFactory) {
	$scope.joinGroup = function (groupCode) {
		GroupFactory.addMember(groupCode)
    .then(function(){
      $state.go('tab.group-logged-in');
    })
    .catch(function(err){
      console.log(err);
    });
	};
});


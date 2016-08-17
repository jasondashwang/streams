'use strict';

angular.module('main').controller('GroupMembersCtrl', function ($scope, GroupFactory) {
	GroupFactory.fetchCurrentGroup()
	.then(function(group){
		$scope.members = group.members;
	});
});


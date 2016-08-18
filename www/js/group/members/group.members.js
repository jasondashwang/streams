'use strict';

angular.module('main').controller('GroupMembersCtrl', ['$scope', 'GroupFactory', function ($scope, GroupFactory) {
	GroupFactory.fetchCurrentGroup()
	.then(function(group){
		$scope.members = group.members;
	});
}]);


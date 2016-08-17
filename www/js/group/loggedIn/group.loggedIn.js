'use strict';

angular.module('main').controller('GroupLoggedInCtrl', function ($scope, GroupFactory, $log) {
	GroupFactory.fetchCurrentGroup()
	.then(function(group){
		$scope.group = group;
	})
});


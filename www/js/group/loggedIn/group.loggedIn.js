'use strict';

angular.module('main').controller('GroupLoggedInCtrl', function ($scope, GroupFactory, currentGroup, $log) {
	console.log(currentGroup)
	$scope.group = currentGroup;
});


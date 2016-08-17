'use strict';

angular.module('main').controller('JoinGroupCtrl', function ($scope, GroupFactory) {
	$scope.joinGroup = function (groupCode) {
		GroupFactory.addMember(groupCode);
	}
});


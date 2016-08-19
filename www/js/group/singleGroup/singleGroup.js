'use strict';

angular.module('main').controller('SingleGroupCtrl',['$scope', '$state', 'GroupFactory', '$log', '$rootScope', 'group', function ($scope, $state, GroupFactory, $log, $rootScope, group) {
	$scope.group = group;
}]);


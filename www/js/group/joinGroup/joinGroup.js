'use strict';

angular.module('main').controller('JoinGroupCtrl', ['$scope', '$state', 'GroupFactory', '$log', function ($scope, $state, GroupFactory, $log) {
	$scope.joinGroup = function (groupCode) {

		GroupFactory.joinGroup(groupCode)
      .then(function() {
        $state.go('tab.groups');
      })
      .catch($log.error);
	};
}]);


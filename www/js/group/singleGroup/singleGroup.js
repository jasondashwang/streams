'use strict';

angular.module('main').controller('SingleGroupCtrl',['$scope', '$state', 'GroupFactory', '$stateParams', '$log', function ($scope, $state, GroupFactory, $stateParams, $log) {

  GroupFactory.fireBase($stateParams.groupCode).$bindTo($scope, 'group');
  console.log('from firebase', $scope.group);

  $scope.leaveGroup = function() {
    GroupFactory.leaveGroup($stateParams.groupCode)
      .then($state.go('tab.groups'))
      .catch($log.error);
  };

  $scope.endGroup = function() {
    GroupFactory.leaveGroup($scope.group.members, $stateParams.groupCode)
      .then($state.go('tab.groups'))
      .catch($log.error);
  };

}]);

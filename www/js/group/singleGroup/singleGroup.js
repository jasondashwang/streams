'use strict';

angular.module('main').controller('SingleGroupCtrl',['$scope', '$state', 'GroupFactory', '$stateParams', '$log', '$ionicNavBarDelegate', function ($scope, $state, GroupFactory, $stateParams, $log, $ionicNavBarDelegate) {

  GroupFactory.fireBase($stateParams.groupCode).$bindTo($scope, 'group');

  $scope.leaveGroup = function() {
    GroupFactory.leaveGroup($stateParams.groupCode)
      .then(function() {
        $ionicNavBarDelegate.showBackButton(false);
        $state.go('tab.groups');
      })
      .catch($log.error);
  };

  $scope.endGroup = function(groupMembers) {
    GroupFactory.endGroup(groupMembers, $stateParams.groupCode);
    $ionicNavBarDelegate.showBackButton(false);
    $state.go('tab.groups');
  };

}]);

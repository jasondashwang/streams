'use strict';

angular.module('main').controller('SingleGroupCtrl',['$scope', '$state', 'GroupFactory', '$stateParams', function ($scope, $state, GroupFactory, $stateParams) {

  GroupFactory.fireBase($stateParams.groupCode).$bindTo($scope, 'group');

  $scope.leaveGroup = function() {
    GroupFactory.leaveGroup($stateParams.groupCode);
  };

}]);


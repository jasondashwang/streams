'use strict';

angular.module('main').controller('SingleGroupCtrl',['$scope', '$state', 'GroupFactory', function ($scope, $state, GroupFactory) {

  $scope.leaveGroup = function() {
    GroupFactory.leaveGroup();
  };

}]);


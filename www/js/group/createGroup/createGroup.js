'use strict';

angular.module('main')
.controller('CreateGroupCtrl', function ($scope, GroupFactory, $state, $log) {

  $scope.createGroup = function(groupInfo) {
    GroupFactory.createGroup(groupInfo)
    .then(() => $state.go('camera'))
    .catch($log.error);
  };

});


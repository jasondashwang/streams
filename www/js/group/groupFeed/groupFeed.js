'use strict';

angular.module('main').controller('GroupFeedCtrl',['$scope', '$stateParams', 'GroupFactory', function ($scope, $stateParams, GroupFactory) {

  $scope.groupCode = $stateParams.groupCode;

  $scope.$on("$ionicView.enter", function () {
    $scope.mediaObjects = GroupFactory.fetchMedia($stateParams.groupCode);
  });

}]);


'use strict';

angular.module('main').controller('GroupFeedCtrl',['$scope', '$stateParams', 'GroupFactory', 'MediaService', function ($scope, $stateParams, GroupFactory, MediaService) {

  GroupFactory.fireBase($stateParams.groupCode).$bindTo($scope, 'group');

  $scope.groupCode = $stateParams.groupCode;

  $scope.$on("$ionicView.enter", function () {
    $scope.mediaObjects = GroupFactory.fetchMedia($stateParams.groupCode);
    MediaService.mediaObjects = $scope.mediaObjects;
  });

}]);


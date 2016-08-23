'use strict';

angular.module('main').controller('GroupMembersCtrl', ['$scope', 'GroupService', '$stateParams', function ($scope, GroupService, $stateParams) {

  $scope.$on("$ionicView.loaded", function () {
    GroupService.getGroupMembers($stateParams.groupCode)
    .then(function(members){
      $scope.members = members;
      
    })
    .catch(function(err){
      console.err(err);
    });
  });
}]);


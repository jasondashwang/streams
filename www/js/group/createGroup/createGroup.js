'use strict';

angular.module('main').controller('CreateGroupCtrl', ['$scope', '$state', 'GroupFactory', function ( $scope, $state, GroupFactory) {

  $scope.createGroup = function(groupDetails) {
    GroupFactory.createGroup(groupDetails)
    .then(function(){
      $state.go('tab.groups');
    })
    .catch(function(err){
      console.log(err);
    });
  };

}]);


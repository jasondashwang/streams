'use strict';

angular.module('main').controller('CreateGroupCtrl', ['$rootScope', '$scope', '$state', '$log', 'ionicTimePicker', 'GroupFactory', function ($rootScope, $scope, $state, $log, ionicTimePicker, GroupFactory) {


  $scope.createGroup = function(groupDetails) {
    GroupFactory.createGroup(groupDetails)
    .then(function(){
      $state.go('tab.group-logged-in');
    })
    .catch(function(err){
      console.log(err);
    });
  };

}]);


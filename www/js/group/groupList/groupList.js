angular.module('main').controller('GroupListCtrl', function($scope, GroupFactory){

  $scope.$on("$ionicView.enter", function () {
    GroupFactory.fetchCurrentGroups()
      .then(function(groups) {
      	$scope.groups = groups;
      })
      .catch(function(err){
        console.log(err);
      })
  });

});




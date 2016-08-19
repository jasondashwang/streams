angular.module('main').controller('GroupListCtrl', function($scope, GroupFactory){

  $scope.$on("$ionicView.enter", function () {
    GroupFactory.fetchCurrentGroups()
      .then(function(groups) {
        console.log(groups);
        $scope.groups = groups[0];
        console.log($scope.groups);
      });
  });

});

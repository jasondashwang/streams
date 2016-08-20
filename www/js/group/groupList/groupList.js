angular.module('main').controller('GroupListCtrl', function($scope, GroupFactory, $state){

  $scope.$on("$ionicView.enter", function () {
    GroupFactory.fetchCurrentGroups()
      .then(function(groups) {
      	$scope.groups = groups;
      })
      .catch(function(err){
      	console.error(err);
      });
  });

   	$scope.goRight = function() {
		$state.go("tab.camera")
		console.log('swiped right!')
    }
});




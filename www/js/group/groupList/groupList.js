angular.module('main').controller('GroupListCtrl', function($scope, GroupFactory){

  $scope.$on("$ionicView.enter", function () {
    GroupFactory.fetchCurrentGroups()
      .then(function(groups) {
      	console.log("in controller")
      	console.log(groups)
      })
      .catch(function(err){

      })
  });

});




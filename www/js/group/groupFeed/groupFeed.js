'use strict';

angular.module('main').controller('GroupFeedCtrl',['$scope', '$stateParams', 'GroupFactory', 'MediaService', function ($scope, $stateParams, GroupFactory, MediaService) {

 
  var unbind;
  $scope.$on("$ionicView.enter", function () {
	 $scope.groupCode = $stateParams.groupCode;
	  GroupFactory.fireBase($scope.groupCode)
	  	.$bindTo($scope, 'group')
	  	.then(function(ub){
	  		unbind = ub;
		    $scope.mediaObjects = GroupFactory.fetchMedia($stateParams.groupCode);
		    MediaService.set($scope.mediaObjects);
	  	})

  });

}]);


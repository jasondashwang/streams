'use strict';

angular.module('main').controller('GroupFeedCtrl',['$scope', '$stateParams', 'GroupFactory', 'MediaService', '$ionicNavBarDelegate', function ($scope, $stateParams, GroupFactory, MediaService, $ionicNavBarDelegate) {

  var unbind;
  $scope.$on("$ionicView.enter", function () {
   $ionicNavBarDelegate.showBackButton(false);
	 $scope.groupCode = $stateParams.groupCode;
	  GroupFactory.fireBase($scope.groupCode)
	  	.$bindTo($scope, 'group')
	  	.then(function(ub){
	  		unbind = ub;
		    $scope.mediaObjects = GroupFactory.fetchMedia($stateParams.groupCode);
		    MediaService.set($scope.mediaObjects);
	  	});
  });

}]);


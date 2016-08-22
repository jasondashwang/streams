'use strict';

angular.module('main').controller('GroupFeedCtrl',['$scope', '$stateParams', 'GroupFactory', 'MediaService', '$ionicNavBarDelegate', 'GroupService', function ($scope, $stateParams, GroupFactory, MediaService, $ionicNavBarDelegate, GroupService) {

  var unbindGroup;
  var unbindMedia;
  $scope.$on("$ionicView.enter", function () {
   $ionicNavBarDelegate.showBackButton(false);
	 $scope.groupCode = $stateParams.groupCode;

   if($scope.group){
    if($scope.group.groupCode === $stateParams.groupCode) return;
    else {
      unbindGroup();
      unbindMedia();
    }
   }

    GroupService.getGroup($stateParams.groupCode)
    .then(function(group){
      return group.$bindTo($scope, 'group');
    })
    .then(function(ub){
      unbindGroup = ub;
      return GroupService.getGroupCollage($stateParams.groupCode);
    })
    .then(function(groupCollage){
      return groupCollage.$bindTo($scope, 'mediaObjects');
    })
    .then(function(ub){
      unbindMedia = ub;
      MediaService.set($scope.mediaObjects);
    })
    .catch(function(err){
      console.error(err);
    });
	  // GroupFactory.fireBase($scope.groupCode)
	  // 	.$bindTo($scope, 'group')
	  // 	.then(function(ub){
	  // 		unbind = ub;
		 //    $scope.mediaObjects = GroupFactory.fetchMedia($stateParams.groupCode);
		 //    MediaService.set($scope.mediaObjects);
	  // 	});
  });

}]);


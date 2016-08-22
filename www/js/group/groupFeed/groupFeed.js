'use strict';

angular.module('main').controller('GroupFeedCtrl',['$scope', '$stateParams', 'GroupFactory', 'MediaService', '$ionicNavBarDelegate', 'MessageFactory', function ($scope, $stateParams, GroupFactory, MediaService, $ionicNavBarDelegate, MessageFactory) {

  var unbind;
  $scope.$on("$ionicView.enter", function () {
   // $ionicNavBarDelegate.showBackButton(false);
     $scope.newMessage = {};
	 $scope.groupCode = $stateParams.groupCode;
	  GroupFactory.fireBase($scope.groupCode)
	  	.$bindTo($scope, 'group')
	  	.then(function(ub){
	  		unbind = ub;
		    $scope.mediaObjects = GroupFactory.fetchMedia($stateParams.groupCode);
		    MediaService.set($scope.mediaObjects);
	  	});
  });
  
  $scope.createNewMessage = function () {
  	$scope.newMessage.timeStamp = Date.now()
  	MessageFactory.createNewMessage($scope.newMessage, $scope.groupCode);  	
  }


}]);


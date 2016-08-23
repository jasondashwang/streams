angular.module('main')
	.controller("SendMediaCtrl", function($scope, $stateParams, CameraService, GroupService, CameraFactory, $state, $ionicHistory){

	    $scope.$on("$ionicView.enter", function () {
			$scope.sendGroups = [];
			$scope.media = CameraService.media;
	    GroupService.getCurrentGroups()
		  .then(function(groups) {
		  	$scope.groups = [];
		  	for (var group in groups) {
		  		$scope.groups.push(groups[group]);
		  	}
		  })
		  .catch(function(err){
		    $.growl.error({location: 'tc', message: err.message});
		  });

	    $scope.cancel = function () {
	    	CameraService.media = null;
	    	$scope.sendGroups = [];
	    	$state.go("tab.camera")
	    }

		$scope.sendToGroups = function () {
			CameraFactory.sendMedia($scope.sendGroups, $scope.media)
			$scope.sendGroups = [];
			$ionicHistory.nextViewOptions({
			    disableBack: true
			  });
			$state.go("tab.groups");
		}
		$scope.toggleGroup = function (groupCode) {
			var ind = $scope.sendGroups.indexOf(groupCode);
			(ind !== -1) ? $scope.sendGroups.splice(ind, 1) : $scope.sendGroups.push(groupCode);
		}
	})

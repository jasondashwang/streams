angular.module('main')
	.controller("SendMediaCtrl", function($scope, $stateParams, CameraService, GroupFactory, CameraFactory, $state){

	    $scope.$on("$ionicView.enter", function () {
			$scope.sendGroups = [];
			$scope.media = CameraService.media;
			GroupFactory.fetchCurrentGroups()
              .then(function(groups){
				$scope.groups = groups;
              })	    	
	    })

	    $scope.cancel = function () {
	    	CameraService.media = null;
	    	$scope.sendGroups = [];
	    	$state.go("tab.groups")
	    }

		$scope.sendToGroups = function () {
			CameraFactory.sendMedia($scope.sendGroups, $scope.media)
			$scope.sendGroups = [];
			$state.go("tab.groups")

		}
		$scope.toggleGroup = function (groupCode) {
			var ind = $scope.sendGroups.indexOf(groupCode);
			(ind !== -1) ? $scope.sendGroups.splice(ind, 1) : $scope.sendGroups.push(groupCode);
		}
	})

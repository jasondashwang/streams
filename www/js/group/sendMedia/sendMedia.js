angular.module('main')
	.controller("SendMediaCtrl", function($scope, $stateParams, CameraService, GroupService, CameraFactory, $state, $ionicHistory){

	    $scope.$on("$ionicView.enter", function () {
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
			});

			var sendGroups = [];
			function filterSendGroups() {
				sendGroups = $scope.groups.forEach(function(group) {
				delete group.sendGroup;
			});
			}

	    $scope.cancel = function () {
	    	CameraService.media = null;
	    	filterSendGroups();
	    	$state.go("tab.camera");
	    };

		$scope.sendToGroups = function () {
			CameraFactory.sendMedia(sendGroups, $scope.media);
			filterSendGroups();
			$ionicHistory.clearHistory();
			$ionicHistory.nextViewOptions({
			    disableBack: true
			  });
			$state.go("tab.groups");
		};

	});

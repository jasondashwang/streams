angular.module('main')
	.controller("SendMediaCtrl", function($scope, $stateParams, CameraService, GroupService, CameraFactory, $state, $ionicHistory){

    $scope.$on("$ionicView.enter", function () {
			$scope.media = CameraService.media;
			$ionicHistory.nextViewOptions({
			    disableBack: true
			 });
			
	    GroupService.getCurrentGroups()
		  .then(function(groups) {
		  	console.log('goups here', groups);
		  	$scope.groups = [];
		  	for (var group in groups) {
		  		$scope.groups.push(groups[group]);
		  	}
		  })
		  .catch(function(err){
		    $.growl.error({location: 'tc', message: err.message});
		  });
		});

		function filterSendGroups() {
			$scope.groups.forEach(function(group) {
				delete group.sendGroup;
			});
		}

		var sendGroupCodes = [];

	    $scope.cancel = function () {
	    	CameraService.media = null;
	    	filterSendGroups();
	    	sendGroupCodes = [];
	    	$state.go("tab.camera");
	    };

		$scope.sendToGroups = function () {
			$scope.groups.forEach(function(group) {
				if (group.sendGroup) sendGroupCodes.push(group.groupCode);
			});
			CameraFactory.sendMedia(sendGroupCodes, $scope.media);
			sendGroupCodes = [];
			filterSendGroups();
			$ionicHistory.clearHistory();
			$state.go("tab.groups");
		};

	});

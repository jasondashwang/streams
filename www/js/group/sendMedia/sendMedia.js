angular.module('main')
	.controller("SendMediaCtrl", function($scope, $stateParams, CameraService, GroupService, CameraFactory, $state, $ionicHistory){

	    $scope.$on("$ionicView.enter", function () {
				$scope.media = CameraService.media;
				$ionicHistory.nextViewOptions({
				    disableBack: true
				 });
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

			function filterSendGroups() {
				console.log('should have sendgroup prop', $scope.groups);
				$scope.groups.forEach(function(group) {
					delete group.sendGroup;
				console.log('should have no sendgroup property', $scope.groups);
			});
			}

		var sendGroupCodes = [];
    $scope.cancel = function () {
    	CameraService.media = null;
    	filterSendGroups();
    	sendGroupsCodes = [];
    	$state.go("tab.camera");
    };

		$scope.sendToGroups = function () {
			$scope.groups.forEach(function(group) {
				if (group.sendGroup) sendGroupCodes.push(group.groupCode);
			});
			console.log(sendGroupCodes);
			console.log('groups that are sending', sendGroupCodes);
			CameraFactory.sendMedia(sendGroupCodes, $scope.media);
			sendGroupCodes = [];
			filterSendGroups();
			$ionicHistory.clearHistory();
			$state.go("tab.groups");
		};

	});

angular.module('main').controller('GroupListCtrl', function($ionicModal, $log, $scope, GroupFactory, $state, GroupService, MediaService, $ionicHistory, $timeout){
  function refreshGroups(){
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
  }

	$ionicModal.fromTemplateUrl('js/group/groupList/groupModal.html', {
	scope: $scope,
	animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modal = modal;
	});
	$scope.openModal = function() {
		$scope.modal.show();
	};
	$scope.closeModal = function() {
		$scope.modal.hide();
	};
	// Cleanup the modal when we're done with it!
	$scope.$on('$destroy', function() {
		$scope.modal.remove();
	});

	$scope.createGroup = function(groupDetails){
    GroupFactory.createGroup(groupDetails)
    .then(function(){
      $scope.closeModal();
      refreshGroups();
    })
    .catch(function(err){
      $.growl.error({location: 'tc', message: err.message});
    });
	};

	$scope.joinGroup = function(groupCode){
    GroupFactory.joinGroup(groupCode)
      .then(function() {
        $scope.closeModal();
        refreshGroups();
      })
      .catch(function(err){
        $.growl.error({location: 'tc', message: err});
      });
	};

	$scope.$on("$ionicView.enter", function () {
      $ionicHistory.clearHistory();
	    refreshGroups();
  });
});



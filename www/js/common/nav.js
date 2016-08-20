angular.module('main').controller("NavBarCtrl", function($scope, $rootScope, $ionicModal, $state){
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
	// Execute action on hide modal
	$scope.$on('modal.hidden', function() {
		// Execute action
	});
	// Execute action on remove modal
	$scope.$on('modal.removed', function() {
		// Execute action
	});

	$scope.createGroup = function(){
		$scope.closeModal();
		$state.go('tab.create-group');
	};
	$scope.joinGroup = function(){
		$scope.closeModal();
		$state.go('tab.join-group');
	};

	
});

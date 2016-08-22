angular.module('main').controller('GroupListCtrl', function($ionicModal, $scope, GroupFactory, $state, GroupService){

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
	$scope.$on("$ionicView.loaded", function () {

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


});

angular.module('main').filter('timeFormat', function(){
 	return function(groups){
 		var now = new Date().toDateString();
 		var stamp; 
 		if (!groups) return;
 		
 		groups.forEach(function(group){
 			if (!group.lastMessage) return;
 			stamp = new Date(group.lastMessage.timeStamp)
 			if (now == stamp.toDateString()) {
 				var hours = stamp.getHours();
 				var minutes = stamp.getMinutes();
 				if (minutes < 10) minutes = '0' + minutes;
 				var period = 'am';
 				if (hours > 12) {
 					period = 'pm';
 					hours -= 12;
 				}
 				group.lastMessage.timeFormatted = hours + ":" + minutes + " " + period;
 			} else {
 				group.lastMessage.timeFormatted = stamp.toDateString();
 			}
 		})
 
 		return groups;
 	}
 
 
 })




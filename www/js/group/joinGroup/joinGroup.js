'use strict';

angular.module('main').controller('JoinGroupCtrl', ['$scope', '$state', 'GroupFactory', function ($scope, $state, GroupFactory) {
	$scope.joinGroup = function (activeCode) {
		GroupFactory.addMember(activeCode)
    .then(function(){
      $state.go('tab.group-logged-in');
    })
    .catch(function(err){
      alert(err);
    });
	};
}]);


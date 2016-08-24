'use strict';

angular.module('main').controller('GroupMembersCtrl', ['$scope', 'GroupService', '$stateParams', 'AuthService', '$ionicPopup', 'GroupFactory', '$state', function ($scope, GroupService, $stateParams, AuthService, $ionicPopup, GroupFactory, $state) {

  $scope.$on("$ionicView.enter", function () {
    GroupService.getGroupMembers($stateParams.groupCode)
    .then(function(members){
      $scope.members = members;
    })
    .catch(function(err){
      $.growl.error({location: 'tc', message: err.message});
    });
  });

  // determine if the user logged in is an Admin or not of the group
  GroupService.getGroup($stateParams.groupCode)
  .then(function(group) {
    return AuthService.getLoggedInUser()
      .then(function(user) {
        $scope.isAdmin = group.members[user.uid];
        $scope.notSelf = function(userId) {
          return user.uid !== userId;
        };
      });
  });

  function removeFromGroup(memberCode) {
    GroupFactory.removeMember(memberCode, $stateParams.groupCode);
    $state.go($state.current, {}, {reload: true});
  }

  $scope.updateMemberInfo = function(memberName, memberCode) {
    $scope.data = {};
    $scope.memberCode = memberCode;

    // An elaborate, custom popup
    $ionicPopup.show({
      title: '' + memberName,
      scope: $scope,
      buttons: [
          { text: 'Cancel' },
          { text: 'Remove',
            type: 'button-positive',
            onTap: function() {
              removeFromGroup(memberCode);
            }
          }
        ]
    });
   };


}]);


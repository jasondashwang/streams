'use strict';

angular.module('main').controller('SingleGroupCtrl',['$scope', '$state', '$stateParams', '$log', '$ionicNavBarDelegate', 'CameraFactory', '$cordovaCamera', 'loggedInUser', 'GroupFactory', 'GroupService', '$ionicHistory', '$ionicPopup', function ($scope, $state, $stateParams, $log, $ionicNavBarDelegate, CameraFactory, $cordovaCamera, loggedInUser, GroupFactory, GroupService, $ionicHistory, $ionicPopup) {
  var unbind;
  $scope.$on("$ionicView.loaded", function () {
    if($scope.group){
      if($scope.group.groupCode === $stateParams.groupCode) return;
      else unbind();
    }
    GroupService.getGroup($stateParams.groupCode, true)
    .then(function(group){
      return group.$bindTo($scope, 'group');
    })
    .then(function(ub) {
      unbind = ub;
      $scope.isAdmin = $scope.group.members[loggedInUser.uid];
      $scope.newGroup = {
        name: $scope.group.name
      };
    })
    .catch(function(err){
      console.log(err);
    });
  });

  function cleanForm(form){
    form.$setPristine();
    form.$setUntouched();
  }

  $scope.getMembersCount = function(members) {
    if (!members) return;
    var membersCount = Object.keys(members).length;
    if (membersCount === 1) return membersCount + ' Member';
    return membersCount + ' Members';
  };

  $scope.submit = {
    groupName: function(form){
      $scope.group.name = $scope.newGroup.name;
      cleanForm(form);
    }
  };

  // sets group photo
  $scope.takeImage = function(groupCode) {
      var options = {
          quality: 80,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.CAMERA,
          allowEdit: true,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 250,
          targetHeight: 250,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: false
      };

      $cordovaCamera.getPicture(options).then(function(imageData) {
          $scope.group.mediaUrl = "data:image/jpeg;base64," + imageData;
          CameraFactory.changeGroupPicture($scope.group.mediaUrl, groupCode);
      }, function(err) {
          console.error('Camera Error', err);
      });
  };

  $scope.leaveGroup = function() {
    GroupFactory.leaveGroup($stateParams.groupCode)
      .then(function() {
        GroupService.removeGroup($stateParams.groupCode);
        $ionicHistory.nextViewOptions({
            disableBack: true
         });
        $state.go('tab.groups');
      })
      .catch($log.error);
  };

  $scope.endGroup = function(groupMembers) {
    var confirmPopup = $ionicPopup.confirm({
      title: 'End Group',
      template: 'Are you sure? All your group info will be removed :(.'
    });
    confirmPopup.then(function(res) {
      if (res) {
        GroupFactory.endGroup(groupMembers, $stateParams.groupCode);
        GroupService.removeGroup($stateParams.groupCode);
        $ionicHistory.nextViewOptions({
            disableBack: true
         });
        $state.go('tab.groups');
      }
    });
  };
}]);

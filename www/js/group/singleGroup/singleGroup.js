'use strict';

angular.module('main').controller('SingleGroupCtrl',['$scope', '$state', 'GroupFactory', '$stateParams', '$log', '$ionicNavBarDelegate', 'CameraFactory', '$cordovaCamera', function ($scope, $state, GroupFactory, $stateParams, $log, $ionicNavBarDelegate, CameraFactory, $cordovaCamera) {

  $scope.$on("$ionicView.enter", function () {
    GroupFactory.fireBase($stateParams.groupCode).$bindTo($scope, 'group');
    $scope.newGroup = {
      name: $scope.group.name
    };
  });

  function cleanForm(form){
    form.$setPristine();
    form.$setUntouched();
  }

  $scope.getMembersCount = function(members) {
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
        $ionicNavBarDelegate.showBackButton(false);
        $state.go('tab.groups');
      })
      .catch($log.error);
  };

  $scope.endGroup = function(groupMembers) {
    GroupFactory.endGroup(groupMembers, $stateParams.groupCode);
    $ionicNavBarDelegate.showBackButton(false);
    $state.go('tab.groups');
  };

}]);

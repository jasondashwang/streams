'use strict';

angular.module('main').controller('SingleGroupCtrl',['$scope', '$state', 'GroupFactory', '$stateParams', '$log', '$ionicNavBarDelegate', 'CameraFactory', '$cordovaCamera', function ($scope, $state, GroupFactory, $stateParams, $log, $ionicNavBarDelegate, CameraFactory, $cordovaCamera) {

  GroupFactory.fireBase($stateParams.groupCode).$bindTo($scope, 'group');

  function cleanForm(form){
    form.$setPristine();
    form.$setUntouched();
  }

  $scope.submit = {
    email: function(form){
      if(form.$dirty){
        AuthService.changeEmail($scope.newProfile.email)
        .then(function(res){
          $scope.profile.email = $scope.newProfile.email;
          cleanForm(form);
        })
        .catch(function(err){
          console.log(err);
          cleanForm(form);
        });

      } else cleanForm(form);

    },
    password: function(form){
      AuthService.changePassword($scope.newProfile.newPassword)
      .then(function(res){
        alert(res);
        $scope.passwordShown = false;
        $scope.newProfile.newPassword = null;
        cleanForm(form);
      })
      .catch(function(err){
        console.log(err);
        cleanForm(form);
      });
    },
    name: function(form){
      $scope.profile.name = $scope.newProfile.name;
      cleanForm(form);
    },
    phone: function(form){
      $scope.profile.phone = $scope.newProfile.phone;
      cleanForm(form);
    }
  };

  $scope.takeImage = function() {
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
          $scope.profile.photoUrl = "data:image/jpeg;base64," + imageData;
          CameraFactory.changeProfilePicture($scope.profile.photoUrl);
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

'use strict';

angular.module('main').controller('ProfileCtrl', ['$scope', '$state', '$rootScope', 'AuthService', '$cordovaCamera', 'CameraFactory', function ($scope, $state, $rootScope, AuthService, $cordovaCamera, CameraFactory) {

    $scope.passwordShown = false;
    $scope.showPassword = function(){
      $scope.passwordShown = !$scope.passwordShown;
    };

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

    var unbind, fireBaseObj;

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
            CameraFactory.changeProfilePicture($scope.profile.photoUrl, $scope.newProfile.uid);
        }, function(err) {
            console.error('Camera Error', err);
        });
    };

    $scope.logOut = function(){
      AuthService.logout();
      $state.go('tab.login');
      $scope.loggedIn = false;
      if (unbind) unbind();
      fireBaseObj.$destroy();
    };


    $scope.$on("$ionicView.enter", function () {
      if (!$scope.loggedIn) {
        AuthService.getLoggedInUser()
        .then(function(user){
          fireBaseObj = user;
          $scope.newProfile = {
            email: user.email,
            name: user.name,
            phone: user.phone,
            uid: user.uid
          };
          $scope.loggedIn = true;
          return user.$bindTo($scope, 'profile');
        })
        .then(function(ub){
          unbind = ub;
        })
        .catch(function(err){
          console.log(err);
        });
      }

    });
}]);


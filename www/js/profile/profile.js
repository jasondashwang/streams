'use strict';

angular.module('main').controller('ProfileCtrl', ['$scope', '$state', '$rootScope', 'AuthService', '$cordovaCamera', '$ionicPopup', '$timeout', function ($scope, $state, $rootScope, AuthService, $cordovaCamera, $ionicPopup, $timeout) {


    $scope.passwordConfirm = function(){
      $scope.security = {};

      var myPopup = $ionicPopup.show({
        template: '<input type="password" ng-model="security.password">',
        title: 'Enter your password',
        scope: $scope,
        buttons: [
          {text: 'Cancel'},
          {
            text: 'Confirm',
            type: 'button-positive',
            onTap: function(e){
              if(!$scope.security.password){
                e.preventDefault();
              } else {
                return $scope.security.password;
              }
            }
          }
        ]
      });

      return myPopup;
    };


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
          $scope.passwordConfirm()
          .then(function(password){
            if(!password) throw new Error('canceled');
            return AuthService.checkPassword($scope.profile.email, password);
          })
          .then(function(res){
            return AuthService.changeEmail($scope.newProfile.email);
          })
          .then(function(res){
            $.growl.notice({location: 'tc', title: res, message: 'Your Email has been changed!'});
            $scope.profile.email = $scope.newProfile.email;
            cleanForm(form);
          })
          .catch(function(err){
            if(err.message !== 'canceled') $.growl.error({locaiton: 'tc', message: err.message});
            $scope.newProfile.email = $scope.profile.email;
            cleanForm(form);
          });

        } else cleanForm(form);

      },
      password: function(form){
        $scope.passwordConfirm()
        .then(function(oldPassword){
          if(!oldPassword) throw new Error('canceled');
          return AuthService.checkPassword($scope.profile.email, oldPassword);
        })
        .then(function(){
          return AuthService.changePassword($scope.newProfile.newPassword);
        })
        .then(function(res){
          $timeout(function(){
            $.growl.notice({location: 'tc', title: res, message: 'Your password has been changed!'});
            $scope.newProfile.newPassword = null;
            cleanForm(form);
            $scope.showPassword();
          });
        })
        .catch(function(err){
          if(err.message !== 'canceled') $.growl.error({location: 'tc', message: err.message});
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
            CameraFactory.changeProfilePicture($scope.profile.photoUrl);
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


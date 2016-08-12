// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('main', [
  'ionic', 
  'ngCordova',
  'ngTouch',
  'ngAnimate'

  ])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller: function($scope, $state, $rootScope, $cordovaCamera){
      $scope.goToGroup = function(){
        if($rootScope.loggedIn) $state.go('tab.group-logged-in');
        else $state.go('tab.group-logged-out');
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
          console.log("in")
          $cordovaCamera.getPicture(options).then(function(imageData) {
              $scope.srcImage = "data:image/jpeg;base64," + imageData;
          }, function(err) {
              // error
          });
      }

    }

  })

  // Each tab has its own nav history stack:
  .state('tab.camera', {
    url: '/camera',
    views: {
      'tab-camera': {
        templateUrl: 'js/camera/camera.html',
        controller: 'CameraCtrl'
      }
    }
  })

  .state('tab.moments', {
    url: '/moments',
    views: {
      'tab-moments': {
        templateUrl: 'js/moments/moments.html',
        controller: 'MomentsCtrl'
      }
    }
  })
  .state('tab.group-logged-out', {
    url: '/group-logged-out',
    views: {
      'tab-group': {
        templateUrl: 'js/group/loggedOut/group.loggedOut.html',
        controller: 'GroupLoggedOutCtrl'
      }
    }

  })
  .state('tab.group-logged-in', {
    url: '/group-logged-in',
    views: {
      'tab-group': {
        templateUrl: 'js/group/loggedIn/group.loggedIn.html',
        controller: 'GroupLoggedInCtrl'
      }
    }

  })
  .state('tab.create-group', {
    url: '/create-group',
    views: {
      'tab-group': {
        templateUrl: 'js/group/createGroup/createGroup.html',
        controller: 'CreateGroupCtrl'
      }
    }

  })
  .state('tab.join-group', {
    url: '/join-group',
    views: {
      'tab-group': {
        templateUrl: 'js/group/joinGroup/joinGroup.html',
        controller: 'JoinGroupCtrl'
      }
    }
  });

  // .state('tab.dash', {
  //   url: '/dash',
  //   views: {
  //     'tab-dash': {
  //       templateUrl: 'templates/tab-dash.html',
  //       controller: 'DashCtrl'
  //     }
  //   }
  // })

  // .state('tab.chats', {
  //     url: '/chats',
  //     views: {
  //       'tab-chats': {
  //         templateUrl: 'templates/tab-chats.html',
  //         controller: 'ChatsCtrl'
  //       }
  //     }
  //   })
  //   .state('tab.chat-detail', {
  //     url: '/chats/:chatId',
  //     views: {
  //       'tab-chats': {
  //         templateUrl: 'templates/chat-detail.html',
  //         controller: 'ChatDetailCtrl'
  //       }
  //     }
  //   })

  // .state('tab.account', {
  //   url: '/account',
  //   views: {
  //     'tab-account': {
  //       templateUrl: 'templates/tab-account.html',
  //       controller: 'AccountCtrl'
  //     }
  //   }
  // });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/moments');

});

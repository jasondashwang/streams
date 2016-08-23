// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('main', [
  'ionic',
  'ngCordova',
  'firebase',
  'ngFileUpload',
  'LocalStorageModule'
  ])

.run(function($ionicPlatform, $rootScope) {
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
    templateUrl: 'js/tabs/tabs.html',
    controller: 'TabsCtrl'

  })
  .state('tab.login', {
    url: '/login',
    views: {
      'tab-login': {
        templateUrl: 'js/user/login/login.html',
        controller: 'LoginCtrl'
      }
    }
  })
  .state('tab.signup', {
    url: '/signup',
    views: {
      'tab-login': {
        templateUrl: 'js/user/signup/signup.html',
        controller: 'SignupCtrl'
      }
    }
  })
  .state('tab.reset-password', {
    url: '/reset-password',
    views: {
      'tab-login': {
        templateUrl: 'js/user/reset-password/reset-password.html',
        controller: 'ResetPasswordCtrl'
      }
    }
  })
  .state('tab.profile', {
    url: '/profile',
    views: {
      'tab-profile': {
        templateUrl: 'js/profile/profile.html',
        controller: 'ProfileCtrl'
      }
    }
  })
  // Each tab has its own nav history stack:
  .state('tab.camera', {
    url: '/camera',
    views: {
      'tab-camera': {
        templateUrl: 'js/camera/camera.html',
        controller: 'CameraCtrl',
      }
    }
  })
  .state('tab.send-media', {
    url: '/send-media',
    views: {
      'tab-camera': {
        templateUrl: 'js/group/sendMedia/sendMedia.html',
        controller: 'SendMediaCtrl'
      }
    }
  })
  .state('tab.groups', {
    url: '/groups',
    views: {
      'tab-group': {
        templateUrl: 'js/group/groupList/groupList.html',
        controller: 'GroupListCtrl'
      }
    }
  })
  .state('tab.groupFeed', {
    url: '/groupFeed/:groupCode',
    views: {
      'tab-group': {
        templateUrl: 'js/group/groupFeed/groupFeed.html',
        controller: 'GroupFeedCtrl'
      }
    }
  })
  .state('tab.groupFeed.chat', {
    url: '/chat',
    template: '<ion-view><ion-content><h1>Chat</h1></ion-view></ion-content>'

  })
  .state('tab.groupFeed.media', {
    url: '/media',
    template: '<ion-view><ion-content><h1>Media</h1></ion-view></ion-content>'
  })
  .state('tab.single-group', {
    url: '/single-group/:groupCode',
    views: {
      'tab-group': {
        templateUrl: 'js/group/singleGroup/singleGroup.html',
        controller: 'SingleGroupCtrl',
        resolve: {
          loggedInUser: function(AuthService) {
            return AuthService.getLoggedInUser();
          }
        }
      }
    }
  })
  .state('tab.group-members', {
    url: '/group-members/:groupCode',
    views: {
      'tab-group': {
        templateUrl: 'js/group/members/group.members.html',
        controller: 'GroupMembersCtrl'
      }
    }
  })
  .state('tab.map', {
    url: '/map',
    views : {
      'tab-group' : {
        templateUrl: 'js/map/map.html',
        controller: 'MapCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/login');

});

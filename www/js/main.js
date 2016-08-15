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
  'ionic-timepicker'
  ])

.run(["$ionicPlatform", "$rootScope", function($ionicPlatform, $rootScope) {
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
    $rootScope.deviceInformation = ionic.Platform.device();
    $rootScope.deviceUUID = ionic.Platform.device().uuid;
    console.log('the id?', $rootScope.deviceUUID);
    console.log('should be some info', $rootScope.deviceInformation);
  });
}])

.config(["$stateProvider", "$urlRouterProvider", "ionicTimePickerProvider", function($stateProvider, $urlRouterProvider, ionicTimePickerProvider) {

  var timePickerObj = {
      inputTime: (((new Date()).getHours() * 60 * 60) + ((new Date()).getMinutes() * 60)),
      format: 12,
      step: 15,
      setLabel: 'Set',
      closeLabel: 'Close'
    };
  ionicTimePickerProvider.configTimePicker(timePickerObj);

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
    controller: ["$scope", "$state", "$rootScope", "$cordovaCamera", "$firebase", function($scope, $state, $rootScope, $cordovaCamera, $firebase) {

      // firebase.auth().onAuthStateChanged(function(user) {
      //   if (user) {
      //     // User is signed in.
      //   } else {
      //     // No user is signed in.
      //   }
      // });

      $scope.goToGroup = function(){
        if($rootScope.loggedIn) $state.go('tab.group-logged-in');
        else $state.go('tab.group-logged-out');
      };
    }]

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
  .state('tab.group-members', {
    url: '/group-members',
    views: {
      'tab-group': {
        templateUrl: 'js/group/members/group.members.html',
        controller: 'GroupMembersCtrl'
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
  })
  .state('tab.map', {
    url: '/map',
    views : {
      'tab-moments' : {
        templateUrl: 'js/map/map.html',
        controller: 'MapCtrl'
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

}]);

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
  'ionic-timepicker'
  ])

.run(["$ionicPlatform", "$rootScope", function($ionicPlatform, $rootScope) {
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
    $rootScope.deviceInformation = ionic.Platform.device();
    $rootScope.deviceUUID = ionic.Platform.device().uuid;
    console.log('the id?', $rootScope.deviceUUID);
    console.log('should be some info', $rootScope.deviceInformation);
  });
}])

.config(["$stateProvider", "$urlRouterProvider", "ionicTimePickerProvider", function($stateProvider, $urlRouterProvider, ionicTimePickerProvider) {

  var timePickerObj = {
      inputTime: (((new Date()).getHours() * 60 * 60) + ((new Date()).getMinutes() * 60)),
      format: 12,
      step: 15,
      setLabel: 'Set',
      closeLabel: 'Close'
    };
  ionicTimePickerProvider.configTimePicker(timePickerObj);

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
    controller: ["$scope", "$state", "$rootScope", "$cordovaCamera", "$firebase", function($scope, $state, $rootScope, $cordovaCamera, $firebase) {

      // firebase.auth().onAuthStateChanged(function(user) {
      //   if (user) {
      //     // User is signed in.
      //   } else {
      //     // No user is signed in.
      //   }
      // });

      $scope.goToGroup = function(){
        if($rootScope.loggedIn) $state.go('tab.group-logged-in');
        else $state.go('tab.group-logged-out');
      };
    }]

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
  .state('tab.group-members', {
    url: '/group-members',
    views: {
      'tab-group': {
        templateUrl: 'js/group/members/group.members.html',
        controller: 'GroupMembersCtrl'
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
  })
  .state('tab.map', {
    url: '/map',
    views : {
      'tab-moments' : {
        templateUrl: 'js/map/map.html',
        controller: 'MapCtrl'
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

}]);

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
  'ionic-timepicker'
  ])

.run(["$ionicPlatform", "$rootScope", function($ionicPlatform, $rootScope) {
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
    $rootScope.deviceInformation = ionic.Platform.device();
    $rootScope.deviceUUID = ionic.Platform.device().uuid;
    console.log('the id?', $rootScope.deviceUUID);
    console.log('should be some info', $rootScope.deviceInformation);
  });
}])

.config(["$stateProvider", "$urlRouterProvider", "ionicTimePickerProvider", function($stateProvider, $urlRouterProvider, ionicTimePickerProvider) {

  var timePickerObj = {
      inputTime: (((new Date()).getHours() * 60 * 60) + ((new Date()).getMinutes() * 60)),
      format: 12,
      step: 15,
      setLabel: 'Set',
      closeLabel: 'Close'
    };
  ionicTimePickerProvider.configTimePicker(timePickerObj);

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
    controller: ["$scope", "$state", "$rootScope", "$cordovaCamera", "$firebase", function($scope, $state, $rootScope, $cordovaCamera, $firebase) {

      // firebase.auth().onAuthStateChanged(function(user) {
      //   if (user) {
      //     // User is signed in.
      //   } else {
      //     // No user is signed in.
      //   }
      // });

      $scope.goToGroup = function(){
        if($rootScope.loggedIn) $state.go('tab.group-logged-in');
        else $state.go('tab.group-logged-out');
      };
    }]

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
  .state('tab.group-members', {
    url: '/group-members',
    views: {
      'tab-group': {
        templateUrl: 'js/group/members/group.members.html',
        controller: 'GroupMembersCtrl'
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
  })
  .state('tab.map', {
    url: '/map',
    views : {
      'tab-moments' : {
        templateUrl: 'js/map/map.html',
        controller: 'MapCtrl'
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

}]);

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
  'ionic-timepicker'
  ])

.run(["$ionicPlatform", "$rootScope", function($ionicPlatform, $rootScope) {
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
    $rootScope.deviceInformation = ionic.Platform.device();
    $rootScope.deviceUUID = ionic.Platform.device().uuid;
    console.log('the id?', $rootScope.deviceUUID);
    console.log('should be some info', $rootScope.deviceInformation);
  });
}])

.config(["$stateProvider", "$urlRouterProvider", "ionicTimePickerProvider", function($stateProvider, $urlRouterProvider, ionicTimePickerProvider) {

  var timePickerObj = {
      inputTime: (((new Date()).getHours() * 60 * 60) + ((new Date()).getMinutes() * 60)),
      format: 12,
      step: 15,
      setLabel: 'Set',
      closeLabel: 'Close'
    };
  ionicTimePickerProvider.configTimePicker(timePickerObj);

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
    controller: ["$scope", "$state", "$rootScope", "$cordovaCamera", "$firebase", function($scope, $state, $rootScope, $cordovaCamera, $firebase) {

      // firebase.auth().onAuthStateChanged(function(user) {
      //   if (user) {
      //     // User is signed in.
      //   } else {
      //     // No user is signed in.
      //   }
      // });

      $scope.goToGroup = function(){
        if($rootScope.loggedIn) $state.go('tab.group-logged-in');
        else $state.go('tab.group-logged-out');
      };
    }]

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
  .state('tab.group-members', {
    url: '/group-members',
    views: {
      'tab-group': {
        templateUrl: 'js/group/members/group.members.html',
        controller: 'GroupMembersCtrl'
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
  })
  .state('tab.map', {
    url: '/map',
    views : {
      'tab-moments' : {
        templateUrl: 'js/map/map.html',
        controller: 'MapCtrl'
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

}]);

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
  'ionic-timepicker'
  ])

.run(["$ionicPlatform", "$rootScope", function($ionicPlatform, $rootScope) {
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
    $rootScope.deviceInformation = ionic.Platform.device();
    $rootScope.deviceUUID = ionic.Platform.device().uuid;
    console.log('the id?', $rootScope.deviceUUID);
    console.log('should be some info', $rootScope.deviceInformation);
  });
}])

.config(["$stateProvider", "$urlRouterProvider", "ionicTimePickerProvider", function($stateProvider, $urlRouterProvider, ionicTimePickerProvider) {

  var timePickerObj = {
      inputTime: (((new Date()).getHours() * 60 * 60) + ((new Date()).getMinutes() * 60)),
      format: 12,
      step: 15,
      setLabel: 'Set',
      closeLabel: 'Close'
    };
  ionicTimePickerProvider.configTimePicker(timePickerObj);

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
    controller: ["$scope", "$state", "$rootScope", "$cordovaCamera", "$firebase", function($scope, $state, $rootScope, $cordovaCamera, $firebase) {

      // firebase.auth().onAuthStateChanged(function(user) {
      //   if (user) {
      //     // User is signed in.
      //   } else {
      //     // No user is signed in.
      //   }
      // });

      $scope.goToGroup = function(){
        if($rootScope.loggedIn) $state.go('tab.group-logged-in');
        else $state.go('tab.group-logged-out');
      };
    }]

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
  .state('tab.group-members', {
    url: '/group-members',
    views: {
      'tab-group': {
        templateUrl: 'js/group/members/group.members.html',
        controller: 'GroupMembersCtrl'
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
  })
  .state('tab.map', {
    url: '/map',
    views : {
      'tab-moments' : {
        templateUrl: 'js/map/map.html',
        controller: 'MapCtrl'
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

}]);

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
  'ionic-timepicker'
  ])

.run(["$ionicPlatform", "$rootScope", function($ionicPlatform, $rootScope) {
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
    $rootScope.deviceInformation = ionic.Platform.device();
    $rootScope.deviceUUID = ionic.Platform.device().uuid;
    console.log('the id?', $rootScope.deviceUUID);
    console.log('should be some info', $rootScope.deviceInformation);
  });
}])

.config(["$stateProvider", "$urlRouterProvider", "ionicTimePickerProvider", function($stateProvider, $urlRouterProvider, ionicTimePickerProvider) {

  var timePickerObj = {
      inputTime: (((new Date()).getHours() * 60 * 60) + ((new Date()).getMinutes() * 60)),
      format: 12,
      step: 15,
      setLabel: 'Set',
      closeLabel: 'Close'
    };
  ionicTimePickerProvider.configTimePicker(timePickerObj);

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
    controller: ["$scope", "$state", "$rootScope", "$cordovaCamera", "$firebase", function($scope, $state, $rootScope, $cordovaCamera, $firebase) {

      // firebase.auth().onAuthStateChanged(function(user) {
      //   if (user) {
      //     // User is signed in.
      //   } else {
      //     // No user is signed in.
      //   }
      // });

      $scope.goToGroup = function(){
        if($rootScope.loggedIn) $state.go('tab.group-logged-in');
        else $state.go('tab.group-logged-out');
      };
    }]

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
  .state('tab.group-members', {
    url: '/group-members',
    views: {
      'tab-group': {
        templateUrl: 'js/group/members/group.members.html',
        controller: 'GroupMembersCtrl'
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
  })
  .state('tab.map', {
    url: '/map',
    views : {
      'tab-moments' : {
        templateUrl: 'js/map/map.html',
        controller: 'MapCtrl'
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

}]);

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
  'ionic-timepicker'
  ])

.run(["$ionicPlatform", "$rootScope", function($ionicPlatform, $rootScope) {
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
    $rootScope.deviceInformation = ionic.Platform.device();
    $rootScope.deviceUUID = ionic.Platform.device().uuid;
    console.log('the id?', $rootScope.deviceUUID);
    console.log('should be some info', $rootScope.deviceInformation);
  });
}])

.config(["$stateProvider", "$urlRouterProvider", "ionicTimePickerProvider", function($stateProvider, $urlRouterProvider, ionicTimePickerProvider) {

  var timePickerObj = {
      inputTime: (((new Date()).getHours() * 60 * 60) + ((new Date()).getMinutes() * 60)),
      format: 12,
      step: 15,
      setLabel: 'Set',
      closeLabel: 'Close'
    };
  ionicTimePickerProvider.configTimePicker(timePickerObj);

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
    controller: ["$scope", "$state", "$rootScope", "$cordovaCamera", "$firebase", function($scope, $state, $rootScope, $cordovaCamera, $firebase) {

      // firebase.auth().onAuthStateChanged(function(user) {
      //   if (user) {
      //     // User is signed in.
      //   } else {
      //     // No user is signed in.
      //   }
      // });

      $scope.goToGroup = function(){
        if($rootScope.loggedIn) $state.go('tab.group-logged-in');
        else $state.go('tab.group-logged-out');
      };
    }]

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
  .state('tab.group-members', {
    url: '/group-members',
    views: {
      'tab-group': {
        templateUrl: 'js/group/members/group.members.html',
        controller: 'GroupMembersCtrl'
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
  })
  .state('tab.map', {
    url: '/map',
    views : {
      'tab-moments' : {
        templateUrl: 'js/map/map.html',
        controller: 'MapCtrl'
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

}]);

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
  'ionic-timepicker'
  ])

.run(["$ionicPlatform", "$rootScope", function($ionicPlatform, $rootScope) {
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
    $rootScope.deviceInformation = ionic.Platform.device();
    $rootScope.deviceUUID = ionic.Platform.device().uuid;
    console.log('the id?', $rootScope.deviceUUID);
    console.log('should be some info', $rootScope.deviceInformation);
  });
}])

.config(["$stateProvider", "$urlRouterProvider", "ionicTimePickerProvider", function($stateProvider, $urlRouterProvider, ionicTimePickerProvider) {

  var timePickerObj = {
      inputTime: (((new Date()).getHours() * 60 * 60) + ((new Date()).getMinutes() * 60)),
      format: 12,
      step: 15,
      setLabel: 'Set',
      closeLabel: 'Close'
    };
  ionicTimePickerProvider.configTimePicker(timePickerObj);

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
    controller: ["$scope", "$state", "$rootScope", "$cordovaCamera", "$firebase", function($scope, $state, $rootScope, $cordovaCamera, $firebase) {

      // firebase.auth().onAuthStateChanged(function(user) {
      //   if (user) {
      //     // User is signed in.
      //   } else {
      //     // No user is signed in.
      //   }
      // });

      $scope.goToGroup = function(){
        if($rootScope.loggedIn) $state.go('tab.group-logged-in');
        else $state.go('tab.group-logged-out');
      };
    }]

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
  .state('tab.group-members', {
    url: '/group-members',
    views: {
      'tab-group': {
        templateUrl: 'js/group/members/group.members.html',
        controller: 'GroupMembersCtrl'
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
  })
  .state('tab.map', {
    url: '/map',
    views : {
      'tab-moments' : {
        templateUrl: 'js/map/map.html',
        controller: 'MapCtrl'
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

}]);

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
  'ionic-timepicker'
  ])

.run(["$ionicPlatform", "$rootScope", function($ionicPlatform, $rootScope) {
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
    $rootScope.deviceInformation = ionic.Platform.device();
    $rootScope.deviceUUID = ionic.Platform.device().uuid;
    console.log('the id?', $rootScope.deviceUUID);
    console.log('should be some info', $rootScope.deviceInformation);
  });
}])

.config(["$stateProvider", "$urlRouterProvider", "ionicTimePickerProvider", function($stateProvider, $urlRouterProvider, ionicTimePickerProvider) {

  var timePickerObj = {
      inputTime: (((new Date()).getHours() * 60 * 60) + ((new Date()).getMinutes() * 60)),
      format: 12,
      step: 15,
      setLabel: 'Set',
      closeLabel: 'Close'
    };
  ionicTimePickerProvider.configTimePicker(timePickerObj);

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
    controller: ["$scope", "$state", "$rootScope", "$cordovaCamera", "$firebase", function($scope, $state, $rootScope, $cordovaCamera, $firebase) {

      // firebase.auth().onAuthStateChanged(function(user) {
      //   if (user) {
      //     // User is signed in.
      //   } else {
      //     // No user is signed in.
      //   }
      // });

      $scope.goToGroup = function(){
        if($rootScope.loggedIn) $state.go('tab.group-logged-in');
        else $state.go('tab.group-logged-out');
      };
    }]

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
  .state('tab.group-members', {
    url: '/group-members',
    views: {
      'tab-group': {
        templateUrl: 'js/group/members/group.members.html',
        controller: 'GroupMembersCtrl'
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
  })
  .state('tab.map', {
    url: '/map',
    views : {
      'tab-moments' : {
        templateUrl: 'js/map/map.html',
        controller: 'MapCtrl'
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

}]);

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
  'ionic-timepicker'
  ])

.run(["$ionicPlatform", "$rootScope", function($ionicPlatform, $rootScope) {
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
    $rootScope.deviceInformation = ionic.Platform.device();
    $rootScope.deviceUUID = ionic.Platform.device().uuid;
    console.log('the id?', $rootScope.deviceUUID);
    console.log('should be some info', $rootScope.deviceInformation);
  });
}])

.config(["$stateProvider", "$urlRouterProvider", "ionicTimePickerProvider", function($stateProvider, $urlRouterProvider, ionicTimePickerProvider) {

  var timePickerObj = {
      inputTime: (((new Date()).getHours() * 60 * 60) + ((new Date()).getMinutes() * 60)),
      format: 12,
      step: 15,
      setLabel: 'Set',
      closeLabel: 'Close'
    };
  ionicTimePickerProvider.configTimePicker(timePickerObj);

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
    controller: ["$scope", "$state", "$rootScope", "$cordovaCamera", "$firebase", function($scope, $state, $rootScope, $cordovaCamera, $firebase) {

      // firebase.auth().onAuthStateChanged(function(user) {
      //   if (user) {
      //     // User is signed in.
      //   } else {
      //     // No user is signed in.
      //   }
      // });

      $scope.goToGroup = function(){
        if($rootScope.loggedIn) $state.go('tab.group-logged-in');
        else $state.go('tab.group-logged-out');
      };
    }]

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
  .state('tab.group-members', {
    url: '/group-members',
    views: {
      'tab-group': {
        templateUrl: 'js/group/members/group.members.html',
        controller: 'GroupMembersCtrl'
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
  })
  .state('tab.map', {
    url: '/map',
    views : {
      'tab-moments' : {
        templateUrl: 'js/map/map.html',
        controller: 'MapCtrl'
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

}]);

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
  'ionic-timepicker'
  ])

.run(["$ionicPlatform", "$rootScope", function($ionicPlatform, $rootScope) {
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
    $rootScope.deviceInformation = ionic.Platform.device();
    $rootScope.deviceUUID = ionic.Platform.device().uuid;
    console.log('the id?', $rootScope.deviceUUID);
    console.log('should be some info', $rootScope.deviceInformation);
  });
}])

.config(["$stateProvider", "$urlRouterProvider", "ionicTimePickerProvider", function($stateProvider, $urlRouterProvider, ionicTimePickerProvider) {

  var timePickerObj = {
      inputTime: (((new Date()).getHours() * 60 * 60) + ((new Date()).getMinutes() * 60)),
      format: 12,
      step: 15,
      setLabel: 'Set',
      closeLabel: 'Close'
    };
  ionicTimePickerProvider.configTimePicker(timePickerObj);

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
    controller: ["$scope", "$state", "$rootScope", "$cordovaCamera", "$firebase", function($scope, $state, $rootScope, $cordovaCamera, $firebase) {

      // firebase.auth().onAuthStateChanged(function(user) {
      //   if (user) {
      //     // User is signed in.
      //   } else {
      //     // No user is signed in.
      //   }
      // });

      $scope.goToGroup = function(){
        if($rootScope.loggedIn) $state.go('tab.group-logged-in');
        else $state.go('tab.group-logged-out');
      };
    }]

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
  .state('tab.group-members', {
    url: '/group-members',
    views: {
      'tab-group': {
        templateUrl: 'js/group/members/group.members.html',
        controller: 'GroupMembersCtrl'
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
  })
  .state('tab.map', {
    url: '/map',
    views : {
      'tab-moments' : {
        templateUrl: 'js/map/map.html',
        controller: 'MapCtrl'
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

}]);

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
  'ionic-timepicker'
  ])

.run(["$ionicPlatform", "$rootScope", function($ionicPlatform, $rootScope) {
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
    $rootScope.deviceInformation = ionic.Platform.device();
    $rootScope.deviceUUID = ionic.Platform.device().uuid;
    console.log('the id?', $rootScope.deviceUUID);
    console.log('should be some info', $rootScope.deviceInformation);
  });
}])

.config(["$stateProvider", "$urlRouterProvider", "ionicTimePickerProvider", function($stateProvider, $urlRouterProvider, ionicTimePickerProvider) {

  var timePickerObj = {
      inputTime: (((new Date()).getHours() * 60 * 60) + ((new Date()).getMinutes() * 60)),
      format: 12,
      step: 15,
      setLabel: 'Set',
      closeLabel: 'Close'
    };
  ionicTimePickerProvider.configTimePicker(timePickerObj);

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
    controller: ["$scope", "$state", "$rootScope", "$cordovaCamera", "$firebase", function($scope, $state, $rootScope, $cordovaCamera, $firebase) {

      // firebase.auth().onAuthStateChanged(function(user) {
      //   if (user) {
      //     // User is signed in.
      //   } else {
      //     // No user is signed in.
      //   }
      // });

      $scope.goToGroup = function(){
        if($rootScope.loggedIn) $state.go('tab.group-logged-in');
        else $state.go('tab.group-logged-out');
      };
    }]

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
  .state('tab.group-members', {
    url: '/group-members',
    views: {
      'tab-group': {
        templateUrl: 'js/group/members/group.members.html',
        controller: 'GroupMembersCtrl'
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
  })
  .state('tab.map', {
    url: '/map',
    views : {
      'tab-moments' : {
        templateUrl: 'js/map/map.html',
        controller: 'MapCtrl'
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

}]);

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
  'ionic-timepicker'
  ])

.run(["$ionicPlatform", "$rootScope", function($ionicPlatform, $rootScope) {
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
    $rootScope.deviceInformation = ionic.Platform.device();
    $rootScope.deviceUUID = ionic.Platform.device().uuid;
    console.log('the id?', $rootScope.deviceUUID);
    console.log('should be some info', $rootScope.deviceInformation);
  });
}])

.config(["$stateProvider", "$urlRouterProvider", "ionicTimePickerProvider", function($stateProvider, $urlRouterProvider, ionicTimePickerProvider) {

  var timePickerObj = {
      inputTime: (((new Date()).getHours() * 60 * 60) + ((new Date()).getMinutes() * 60)),
      format: 12,
      step: 15,
      setLabel: 'Set',
      closeLabel: 'Close'
    };
  ionicTimePickerProvider.configTimePicker(timePickerObj);

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
    controller: ["$scope", "$state", "$rootScope", "$cordovaCamera", "$firebase", function($scope, $state, $rootScope, $cordovaCamera, $firebase) {

      // firebase.auth().onAuthStateChanged(function(user) {
      //   if (user) {
      //     // User is signed in.
      //   } else {
      //     // No user is signed in.
      //   }
      // });

      $scope.goToGroup = function(){
        if($rootScope.loggedIn) $state.go('tab.group-logged-in');
        else $state.go('tab.group-logged-out');
      };
    }]

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
  .state('tab.group-members', {
    url: '/group-members',
    views: {
      'tab-group': {
        templateUrl: 'js/group/members/group.members.html',
        controller: 'GroupMembersCtrl'
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
  })
  .state('tab.map', {
    url: '/map',
    views : {
      'tab-moments' : {
        templateUrl: 'js/map/map.html',
        controller: 'MapCtrl'
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

}]);

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
  'ionic-timepicker'
  ])

.run(["$ionicPlatform", "$rootScope", function($ionicPlatform, $rootScope) {
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
    $rootScope.deviceInformation = ionic.Platform.device();
    $rootScope.deviceUUID = ionic.Platform.device().uuid;
    console.log('the id?', $rootScope.deviceUUID);
    console.log('should be some info', $rootScope.deviceInformation);
  });
}])

.config(["$stateProvider", "$urlRouterProvider", "ionicTimePickerProvider", function($stateProvider, $urlRouterProvider, ionicTimePickerProvider) {

  var timePickerObj = {
      inputTime: (((new Date()).getHours() * 60 * 60) + ((new Date()).getMinutes() * 60)),
      format: 12,
      step: 15,
      setLabel: 'Set',
      closeLabel: 'Close'
    };
  ionicTimePickerProvider.configTimePicker(timePickerObj);

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
    controller: ["$scope", "$state", "$rootScope", "$cordovaCamera", "$firebase", function($scope, $state, $rootScope, $cordovaCamera, $firebase) {

      // firebase.auth().onAuthStateChanged(function(user) {
      //   if (user) {
      //     // User is signed in.
      //   } else {
      //     // No user is signed in.
      //   }
      // });

      $scope.goToGroup = function(){
        if($rootScope.loggedIn) $state.go('tab.group-logged-in');
        else $state.go('tab.group-logged-out');
      };
    }]

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
  .state('tab.group-members', {
    url: '/group-members',
    views: {
      'tab-group': {
        templateUrl: 'js/group/members/group.members.html',
        controller: 'GroupMembersCtrl'
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
  })
  .state('tab.map', {
    url: '/map',
    views : {
      'tab-moments' : {
        templateUrl: 'js/map/map.html',
        controller: 'MapCtrl'
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

}]);

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
  'ionic-timepicker'
  ])

.run(["$ionicPlatform", "$rootScope", function($ionicPlatform, $rootScope) {
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
    $rootScope.deviceInformation = ionic.Platform.device();
    $rootScope.deviceUUID = ionic.Platform.device().uuid;
    console.log('the id?', $rootScope.deviceUUID);
    console.log('should be some info', $rootScope.deviceInformation);
  });
}])

.config(["$stateProvider", "$urlRouterProvider", "ionicTimePickerProvider", function($stateProvider, $urlRouterProvider, ionicTimePickerProvider) {

  var timePickerObj = {
      inputTime: (((new Date()).getHours() * 60 * 60) + ((new Date()).getMinutes() * 60)),
      format: 12,
      step: 15,
      setLabel: 'Set',
      closeLabel: 'Close'
    };
  ionicTimePickerProvider.configTimePicker(timePickerObj);

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
    controller: ["$scope", "$state", "$rootScope", "$cordovaCamera", "$firebase", function($scope, $state, $rootScope, $cordovaCamera, $firebase) {

      // firebase.auth().onAuthStateChanged(function(user) {
      //   if (user) {
      //     // User is signed in.
      //   } else {
      //     // No user is signed in.
      //   }
      // });

      $scope.goToGroup = function(){
        if($rootScope.loggedIn) $state.go('tab.group-logged-in');
        else $state.go('tab.group-logged-out');
      };
    }]

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
  .state('tab.group-members', {
    url: '/group-members',
    views: {
      'tab-group': {
        templateUrl: 'js/group/members/group.members.html',
        controller: 'GroupMembersCtrl'
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
  })
  .state('tab.map', {
    url: '/map',
    views : {
      'tab-moments' : {
        templateUrl: 'js/map/map.html',
        controller: 'MapCtrl'
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

}]);

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
  'ionic-timepicker'
  ])

.run(["$ionicPlatform", "$rootScope", function($ionicPlatform, $rootScope) {
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
    $rootScope.deviceInformation = ionic.Platform.device();
    $rootScope.deviceUUID = ionic.Platform.device().uuid;
    console.log('the id?', $rootScope.deviceUUID);
    console.log('should be some info', $rootScope.deviceInformation);
  });
}])

.config(["$stateProvider", "$urlRouterProvider", "ionicTimePickerProvider", function($stateProvider, $urlRouterProvider, ionicTimePickerProvider) {

  var timePickerObj = {
      inputTime: (((new Date()).getHours() * 60 * 60) + ((new Date()).getMinutes() * 60)),
      format: 12,
      step: 15,
      setLabel: 'Set',
      closeLabel: 'Close'
    };
  ionicTimePickerProvider.configTimePicker(timePickerObj);

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
    controller: ["$scope", "$state", "$rootScope", "$cordovaCamera", "$firebase", function($scope, $state, $rootScope, $cordovaCamera, $firebase) {

      // firebase.auth().onAuthStateChanged(function(user) {
      //   if (user) {
      //     // User is signed in.
      //   } else {
      //     // No user is signed in.
      //   }
      // });

      $scope.goToGroup = function(){
        if($rootScope.loggedIn) $state.go('tab.group-logged-in');
        else $state.go('tab.group-logged-out');
      };
    }]

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
  .state('tab.group-members', {
    url: '/group-members',
    views: {
      'tab-group': {
        templateUrl: 'js/group/members/group.members.html',
        controller: 'GroupMembersCtrl'
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
  })
  .state('tab.map', {
    url: '/map',
    views : {
      'tab-moments' : {
        templateUrl: 'js/map/map.html',
        controller: 'MapCtrl'
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

}]);

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
  'ionic-timepicker'
  ])

.run(["$ionicPlatform", "$rootScope", function($ionicPlatform, $rootScope) {
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
    $rootScope.deviceInformation = ionic.Platform.device();
    $rootScope.deviceUUID = ionic.Platform.device().uuid;
    console.log('the id?', $rootScope.deviceUUID);
    console.log('should be some info', $rootScope.deviceInformation);
  });
}])

.config(["$stateProvider", "$urlRouterProvider", "ionicTimePickerProvider", function($stateProvider, $urlRouterProvider, ionicTimePickerProvider) {

  var timePickerObj = {
      inputTime: (((new Date()).getHours() * 60 * 60) + ((new Date()).getMinutes() * 60)),
      format: 12,
      step: 15,
      setLabel: 'Set',
      closeLabel: 'Close'
    };
  ionicTimePickerProvider.configTimePicker(timePickerObj);

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
    controller: ["$scope", "$state", "$rootScope", "$cordovaCamera", "$firebase", function($scope, $state, $rootScope, $cordovaCamera, $firebase) {

      // firebase.auth().onAuthStateChanged(function(user) {
      //   if (user) {
      //     // User is signed in.
      //   } else {
      //     // No user is signed in.
      //   }
      // });

      $scope.goToGroup = function(){
        if($rootScope.loggedIn) $state.go('tab.group-logged-in');
        else $state.go('tab.group-logged-out');
      };
    }]

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
  .state('tab.group-members', {
    url: '/group-members',
    views: {
      'tab-group': {
        templateUrl: 'js/group/members/group.members.html',
        controller: 'GroupMembersCtrl'
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
  })
  .state('tab.map', {
    url: '/map',
    views : {
      'tab-moments' : {
        templateUrl: 'js/map/map.html',
        controller: 'MapCtrl'
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

}]);

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
  'ionic-timepicker'
  ])

.run(["$ionicPlatform", "$rootScope", function($ionicPlatform, $rootScope) {
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
    $rootScope.deviceInformation = ionic.Platform.device();
    $rootScope.deviceUUID = ionic.Platform.device().uuid;
    console.log('the id?', $rootScope.deviceUUID);
    console.log('should be some info', $rootScope.deviceInformation);
  });
}])

.config(["$stateProvider", "$urlRouterProvider", "ionicTimePickerProvider", function($stateProvider, $urlRouterProvider, ionicTimePickerProvider) {

  var timePickerObj = {
      inputTime: (((new Date()).getHours() * 60 * 60) + ((new Date()).getMinutes() * 60)),
      format: 12,
      step: 15,
      setLabel: 'Set',
      closeLabel: 'Close'
    };
  ionicTimePickerProvider.configTimePicker(timePickerObj);

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
    controller: ["$scope", "$state", "$rootScope", "$cordovaCamera", "$firebase", function($scope, $state, $rootScope, $cordovaCamera, $firebase) {

      // firebase.auth().onAuthStateChanged(function(user) {
      //   if (user) {
      //     // User is signed in.
      //   } else {
      //     // No user is signed in.
      //   }
      // });

      $scope.goToGroup = function(){
        if($rootScope.loggedIn) $state.go('tab.group-logged-in');
        else $state.go('tab.group-logged-out');
      };
    }]

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
  .state('tab.group-members', {
    url: '/group-members',
    views: {
      'tab-group': {
        templateUrl: 'js/group/members/group.members.html',
        controller: 'GroupMembersCtrl'
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
  })
  .state('tab.map', {
    url: '/map',
    views : {
      'tab-moments' : {
        templateUrl: 'js/map/map.html',
        controller: 'MapCtrl'
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

}]);


'use strict';

angular.module('main').controller('CameraCtrl', ["$rootScope", "$scope", "$state", "$cordovaCamera", function ($rootScope, $scope, $state, $cordovaCamera) {
  $rootScope.loggedIn = false;
  $scope.changeStatus = function () {
    $rootScope.loggedIn = !($rootScope.loggedIn);
  };

  $scope.goRight = function () {
  	if ($rootScope.loggedIn) $state.go('tab.group-logged-in');
  		else $state.go("tab.group-logged-out");
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
	        $scope.srcImage = "data:image/jpeg;base64," + imageData;
	    }, function(err) {
	        // error
	    });
	};
}]);


'use strict';

angular.module('main').controller('MapCtrl', ["$scope", "$state", "$cordovaGeolocation", function ($scope, $state, $cordovaGeolocation) {
  var options = {timeout: 10000, enableHighAccuracy: true};

  $cordovaGeolocation.getCurrentPosition(options).then(function(position){

    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var im = 'http://www.robotwoods.com/dev/misc/bluecircle.png';

    var userMarker = new google.maps.Marker({
      position: latLng,
      map: $scope.map,
      icon: im
    });

  }, function(error){
    console.log("Could not get location");
  });

}]);


'use strict';

angular.module('main').controller('MomentsCtrl', ["$rootScope", "$scope", "$state", function ($rootScope, $scope, $state) {
  $scope.greeting = 'Moments View';
  $scope.goToState = function (state) {
    $state.go(state);
  };
  $scope.moments = [{
    date: 'May 19th, 2016'
  },{
    date: 'May 31th, 2016'
  },{
    date: 'May 123, 2016'
  }];
}]);


'use-strict';

angular.module('main')
.directive('dragBack', ["$ionicGesture", "$state", function($ionicGesture, $state) {
  return {
    restrict : 'EAC',
    link : function(scope, elem, attr) {
      
      console.log("Dragback Link");
      
      $ionicGesture.on('swiperight', function(event) {
      
        console.log('Got swiped!');
        event.preventDefault();
        window.history.back();
        
      }, elem);
      
    }
  }  
}])

angular.module('main')
.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    return $firebaseAuth();
  }
]);

angular.module('main')
.factory('GroupFactory', ["$http", function ($http) {

  const GroupFactory = {};

  GroupFactory.createGroup = function (groupDetails) {
    return $http.post('http://localhost:1337/api/groups', groupDetails)
    .then(res => res.data);
  };

  return GroupFactory;

}]);

angular.module('main')
.factory('UserFactory', ["$firebase", function($firebase) {
  const UserFactory = {};

  UserFactory.createUser = function(userDetails) {
    return firebase.auth().createUserWithEmailAndPassword(userDetails.email, userDetails.password)
    .then(res => {
      console.log('this is the response', res);
    });
  };

  UserFactory.login = function(userDetails) {
    return firebase.auth().signInWithEmailAndPassword(userDetails.email, userDetails.password);
  };

  return UserFactory;
}]);

'use strict';

angular.module('main').controller('CreateGroupCtrl', ["$scope", "$state", "$log", "ionicTimePicker", function ($scope, $state, $log, ionicTimePicker) {

  var ipObj1 = {
    callback: function (val) {      //Mandatory
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        var selectedTime = new Date(val * 1000);
        console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
        $scope.group.expirationTime = selectedTime;
        // GroupFactory.createGroup(groupInfo)
        // .then(() => $state.go('camera'))
        // .catch($log.error);
      }
    },
    inputTime: 50400,   //Optional
    format: 12,         //Optional
    step: 15,           //Optional
    setLabel: 'Set2'    //Optional
  };


  $scope.createGroup = function(groupInfo) {
    ionicTimePicker.openTimePicker(ipObj1);


  };

}]);


'use strict';

angular.module('main').controller('JoinGroupCtrl', ["$scope", function ($scope) {

}]);


'use strict';

angular.module('main').controller('GroupLoggedInCtrl', ["$scope", function ($scope) {

}]);


'use strict';

angular.module('main').controller('GroupLoggedOutCtrl', ["$scope", "$location", function ($scope, $location) {
  $scope.goToState = function (state) {
    $state.go(state);
  };
  $scope.goLeft = function () {
  	$location.url('/tab/camera')
  }

}]);


'use strict';

angular.module('main').controller('GroupMembersCtrl', ["$scope", function ($scope) {

}]);


'use strict';

angular.module('main')
.controller('LoginCtrl', ["$scope", "$state", "$log", "UserFactory", "Auth", function ($scope, $state, $log, UserFactory, Auth) {

  $scope.login = function(userInfo) {
    UserFactory.login(userInfo)
    .then(() => $state.go('tab.camera'))
    .catch($log.error);
  };

}]);


'use strict';

angular.module('main')
.controller('SignupCtrl', ["$scope", "$state", "$log", "UserFactory", function ($scope, $state, $log, UserFactory) {
  $scope.signUp = function(userInfo) {
    UserFactory.createUser(userInfo)
    .then(() => $state.go('tab.camera'))
    .catch($log.error);
  };
}]);


'use strict';

angular.module('main').directive('moment', function () {
  return {
    restrict: 'E',
    scope: {
      model: '='
    },
    templateUrl: 'js/common/directives/moment/moment.html'
  };
});

'use strict';

angular.module('main').controller('CameraCtrl', ["$rootScope", "$scope", "$state", "$cordovaCamera", function ($rootScope, $scope, $state, $cordovaCamera) {
  $rootScope.loggedIn = false;
  $scope.changeStatus = function () {
    $rootScope.loggedIn = !($rootScope.loggedIn);
  };

  $scope.goRight = function () {
  	if ($rootScope.loggedIn) $state.go('tab.group-logged-in');
  		else $state.go("tab.group-logged-out");
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
	        $scope.srcImage = "data:image/jpeg;base64," + imageData;
	    }, function(err) {
	        // error
	    });
	};
}]);


'use strict';

angular.module('main').controller('MapCtrl', ["$scope", "$state", "$cordovaGeolocation", function ($scope, $state, $cordovaGeolocation) {
  var options = {timeout: 10000, enableHighAccuracy: true};

  $cordovaGeolocation.getCurrentPosition(options).then(function(position){

    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var im = 'http://www.robotwoods.com/dev/misc/bluecircle.png';

    var userMarker = new google.maps.Marker({
      position: latLng,
      map: $scope.map,
      icon: im
    });

  }, function(error){
    console.log("Could not get location");
  });

}]);


'use strict';

angular.module('main').controller('MomentsCtrl', ["$rootScope", "$scope", "$state", function ($rootScope, $scope, $state) {
  $scope.greeting = 'Moments View';
  $scope.goToState = function (state) {
    $state.go(state);
  };
  $scope.moments = [{
    date: 'May 19th, 2016'
  },{
    date: 'May 31th, 2016'
  },{
    date: 'May 123, 2016'
  }];
}]);


'use strict';

angular.module('main').controller('CreateGroupCtrl', ["$scope", "$state", "$log", "ionicTimePicker", function ($scope, $state, $log, ionicTimePicker) {

  var ipObj1 = {
    callback: function (val) {      //Mandatory
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        var selectedTime = new Date(val * 1000);
        console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
        $scope.group.expirationTime = selectedTime;
        // GroupFactory.createGroup(groupInfo)
        // .then(() => $state.go('camera'))
        // .catch($log.error);
      }
    },
    inputTime: 50400,   //Optional
    format: 12,         //Optional
    step: 15,           //Optional
    setLabel: 'Set2'    //Optional
  };


  $scope.createGroup = function(groupInfo) {
    ionicTimePicker.openTimePicker(ipObj1);


  };

}]);


'use strict';

angular.module('main').controller('JoinGroupCtrl', ["$scope", function ($scope) {

}]);


'use strict';

angular.module('main').controller('GroupLoggedInCtrl', ["$scope", function ($scope) {

}]);


'use strict';

angular.module('main').controller('GroupLoggedOutCtrl', ["$scope", "$location", function ($scope, $location) {
  $scope.goToState = function (state) {
    $state.go(state);
  };
  $scope.goLeft = function () {
  	$location.url('/tab/camera')
  }

}]);


'use strict';

angular.module('main').controller('GroupMembersCtrl', ["$scope", function ($scope) {

}]);


'use-strict';

angular.module('main')
.directive('dragBack', ["$ionicGesture", "$state", function($ionicGesture, $state) {
  return {
    restrict : 'EAC',
    link : function(scope, elem, attr) {
      
      console.log("Dragback Link");
      
      $ionicGesture.on('swiperight', function(event) {
      
        console.log('Got swiped!');
        event.preventDefault();
        window.history.back();
        
      }, elem);
      
    }
  }  
}])

angular.module('main')
.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    return $firebaseAuth();
  }
]);

angular.module('main')
.factory('GroupFactory', ["$http", function ($http) {

  const GroupFactory = {};

  GroupFactory.createGroup = function (groupDetails) {
    return $http.post('http://localhost:1337/api/groups', groupDetails)
    .then(res => res.data);
  };

  return GroupFactory;

}]);

angular.module('main')
.factory('UserFactory', ["$firebase", function($firebase) {
  const UserFactory = {};

  UserFactory.createUser = function(userDetails) {
    return firebase.auth().createUserWithEmailAndPassword(userDetails.email, userDetails.password)
    .then(res => {
      console.log('this is the response', res);
    });
  };

  UserFactory.login = function(userDetails) {
    return firebase.auth().signInWithEmailAndPassword(userDetails.email, userDetails.password);
  };

  return UserFactory;
}]);

'use strict';

angular.module('main')
.controller('LoginCtrl', ["$scope", "$state", "$log", "UserFactory", "Auth", function ($scope, $state, $log, UserFactory, Auth) {

  $scope.login = function(userInfo) {
    UserFactory.login(userInfo)
    .then(() => $state.go('tab.camera'))
    .catch($log.error);
  };

}]);


'use strict';

angular.module('main')
.controller('SignupCtrl', ["$scope", "$state", "$log", "UserFactory", function ($scope, $state, $log, UserFactory) {
  $scope.signUp = function(userInfo) {
    UserFactory.createUser(userInfo)
    .then(() => $state.go('tab.camera'))
    .catch($log.error);
  };
}]);


'use strict';

angular.module('main').directive('moment', function () {
  return {
    restrict: 'E',
    scope: {
      model: '='
    },
    templateUrl: 'js/common/directives/moment/moment.html'
  };
});

'use strict';

angular.module('main').controller('CameraCtrl', ["$rootScope", "$scope", "$state", "$cordovaCamera", function ($rootScope, $scope, $state, $cordovaCamera) {
  $rootScope.loggedIn = false;
  $scope.changeStatus = function () {
    $rootScope.loggedIn = !($rootScope.loggedIn);
  };

  $scope.goRight = function () {
  	if ($rootScope.loggedIn) $state.go('tab.group-logged-in');
  		else $state.go("tab.group-logged-out");
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
	        $scope.srcImage = "data:image/jpeg;base64," + imageData;
	    }, function(err) {
	        // error
	    });
	};
}]);


'use strict';

angular.module('main').controller('MapCtrl', ["$scope", "$state", "$cordovaGeolocation", function ($scope, $state, $cordovaGeolocation) {
  var options = {timeout: 10000, enableHighAccuracy: true};

  $cordovaGeolocation.getCurrentPosition(options).then(function(position){

    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var im = 'http://www.robotwoods.com/dev/misc/bluecircle.png';

    var userMarker = new google.maps.Marker({
      position: latLng,
      map: $scope.map,
      icon: im
    });

  }, function(error){
    console.log("Could not get location");
  });

}]);


'use strict';

angular.module('main').controller('MomentsCtrl', ["$rootScope", "$scope", "$state", function ($rootScope, $scope, $state) {
  $scope.greeting = 'Moments View';
  $scope.goToState = function (state) {
    $state.go(state);
  };
  $scope.moments = [{
    date: 'May 19th, 2016'
  },{
    date: 'May 31th, 2016'
  },{
    date: 'May 123, 2016'
  }];
}]);


'use-strict';

angular.module('main')
.directive('dragBack', ["$ionicGesture", "$state", function($ionicGesture, $state) {
  return {
    restrict : 'EAC',
    link : function(scope, elem, attr) {
      
      console.log("Dragback Link");
      
      $ionicGesture.on('swiperight', function(event) {
      
        console.log('Got swiped!');
        event.preventDefault();
        window.history.back();
        
      }, elem);
      
    }
  }  
}])

angular.module('main')
.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    return $firebaseAuth();
  }
]);

angular.module('main')
.factory('GroupFactory', ["$http", function ($http) {

  const GroupFactory = {};

  GroupFactory.createGroup = function (groupDetails) {
    return $http.post('http://localhost:1337/api/groups', groupDetails)
    .then(res => res.data);
  };

  return GroupFactory;

}]);

angular.module('main')
.factory('UserFactory', ["$firebase", function($firebase) {
  const UserFactory = {};

  UserFactory.createUser = function(userDetails) {
    return firebase.auth().createUserWithEmailAndPassword(userDetails.email, userDetails.password)
    .then(res => {
      console.log('this is the response', res);
    });
  };

  UserFactory.login = function(userDetails) {
    return firebase.auth().signInWithEmailAndPassword(userDetails.email, userDetails.password);
  };

  return UserFactory;
}]);

'use strict';

angular.module('main').controller('CreateGroupCtrl', ["$scope", "$state", "$log", "ionicTimePicker", function ($scope, $state, $log, ionicTimePicker) {

  var ipObj1 = {
    callback: function (val) {      //Mandatory
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        var selectedTime = new Date(val * 1000);
        console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
        $scope.group.expirationTime = selectedTime;
        // GroupFactory.createGroup(groupInfo)
        // .then(() => $state.go('camera'))
        // .catch($log.error);
      }
    },
    inputTime: 50400,   //Optional
    format: 12,         //Optional
    step: 15,           //Optional
    setLabel: 'Set2'    //Optional
  };


  $scope.createGroup = function(groupInfo) {
    ionicTimePicker.openTimePicker(ipObj1);


  };

}]);


'use strict';

angular.module('main').controller('JoinGroupCtrl', ["$scope", function ($scope) {

}]);


'use strict';

angular.module('main').controller('GroupLoggedInCtrl', ["$scope", function ($scope) {

}]);


'use strict';

angular.module('main').controller('GroupLoggedOutCtrl', ["$scope", "$location", function ($scope, $location) {
  $scope.goToState = function (state) {
    $state.go(state);
  };
  $scope.goLeft = function () {
  	$location.url('/tab/camera')
  }

}]);


'use strict';

angular.module('main').controller('GroupMembersCtrl', ["$scope", function ($scope) {

}]);


'use strict';

angular.module('main')
.controller('LoginCtrl', ["$scope", "$state", "$log", "UserFactory", "Auth", function ($scope, $state, $log, UserFactory, Auth) {

  $scope.login = function(userInfo) {
    UserFactory.login(userInfo)
    .then(() => $state.go('tab.camera'))
    .catch($log.error);
  };

}]);


'use strict';

angular.module('main')
.controller('SignupCtrl', ["$scope", "$state", "$log", "UserFactory", function ($scope, $state, $log, UserFactory) {
  $scope.signUp = function(userInfo) {
    UserFactory.createUser(userInfo)
    .then(() => $state.go('tab.camera'))
    .catch($log.error);
  };
}]);


'use strict';

angular.module('main').directive('moment', function () {
  return {
    restrict: 'E',
    scope: {
      model: '='
    },
    templateUrl: 'js/common/directives/moment/moment.html'
  };
});

'use strict';

angular.module('main').controller('CameraCtrl', ["$rootScope", "$scope", "$state", "$cordovaCamera", function ($rootScope, $scope, $state, $cordovaCamera) {
  $rootScope.loggedIn = false;
  $scope.changeStatus = function () {
    $rootScope.loggedIn = !($rootScope.loggedIn);
  };

  $scope.goRight = function () {
  	if ($rootScope.loggedIn) $state.go('tab.group-logged-in');
  		else $state.go("tab.group-logged-out");
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
	        $scope.srcImage = "data:image/jpeg;base64," + imageData;
	    }, function(err) {
	        // error
	    });
	};
}]);


'use strict';

angular.module('main').controller('MapCtrl', ["$scope", "$state", "$cordovaGeolocation", function ($scope, $state, $cordovaGeolocation) {
  var options = {timeout: 10000, enableHighAccuracy: true};

  $cordovaGeolocation.getCurrentPosition(options).then(function(position){

    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var im = 'http://www.robotwoods.com/dev/misc/bluecircle.png';

    var userMarker = new google.maps.Marker({
      position: latLng,
      map: $scope.map,
      icon: im
    });

  }, function(error){
    console.log("Could not get location");
  });

}]);


'use strict';

angular.module('main').controller('MomentsCtrl', ["$rootScope", "$scope", "$state", function ($rootScope, $scope, $state) {
  $scope.greeting = 'Moments View';
  $scope.goToState = function (state) {
    $state.go(state);
  };
  $scope.moments = [{
    date: 'May 19th, 2016'
  },{
    date: 'May 31th, 2016'
  },{
    date: 'May 123, 2016'
  }];
}]);


'use-strict';

angular.module('main')
.directive('dragBack', ["$ionicGesture", "$state", function($ionicGesture, $state) {
  return {
    restrict : 'EAC',
    link : function(scope, elem, attr) {
      
      console.log("Dragback Link");
      
      $ionicGesture.on('swiperight', function(event) {
      
        console.log('Got swiped!');
        event.preventDefault();
        window.history.back();
        
      }, elem);
      
    }
  }  
}])

angular.module('main')
.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    return $firebaseAuth();
  }
]);

angular.module('main')
.factory('GroupFactory', ["$http", function ($http) {

  const GroupFactory = {};

  GroupFactory.createGroup = function (groupDetails) {
    return $http.post('http://localhost:1337/api/groups', groupDetails)
    .then(res => res.data);
  };

  return GroupFactory;

}]);

angular.module('main')
.factory('UserFactory', ["$firebase", function($firebase) {
  const UserFactory = {};

  UserFactory.createUser = function(userDetails) {
    return firebase.auth().createUserWithEmailAndPassword(userDetails.email, userDetails.password)
    .then(res => {
      console.log('this is the response', res);
    });
  };

  UserFactory.login = function(userDetails) {
    return firebase.auth().signInWithEmailAndPassword(userDetails.email, userDetails.password);
  };

  return UserFactory;
}]);

'use strict';

angular.module('main').controller('CreateGroupCtrl', ["$scope", "$state", "$log", "ionicTimePicker", function ($scope, $state, $log, ionicTimePicker) {

  var ipObj1 = {
    callback: function (val) {      //Mandatory
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        var selectedTime = new Date(val * 1000);
        console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
        $scope.group.expirationTime = selectedTime;
        // GroupFactory.createGroup(groupInfo)
        // .then(() => $state.go('camera'))
        // .catch($log.error);
      }
    },
    inputTime: 50400,   //Optional
    format: 12,         //Optional
    step: 15,           //Optional
    setLabel: 'Set2'    //Optional
  };


  $scope.createGroup = function(groupInfo) {
    ionicTimePicker.openTimePicker(ipObj1);


  };

}]);


'use strict';

angular.module('main').controller('JoinGroupCtrl', ["$scope", function ($scope) {

}]);


'use strict';

angular.module('main').controller('GroupLoggedInCtrl', ["$scope", function ($scope) {

}]);


'use strict';

angular.module('main').controller('GroupMembersCtrl', ["$scope", function ($scope) {

}]);


'use strict';

angular.module('main').controller('GroupLoggedOutCtrl', ["$scope", "$location", function ($scope, $location) {
  $scope.goToState = function (state) {
    $state.go(state);
  };
  $scope.goLeft = function () {
  	$location.url('/tab/camera')
  }

}]);


'use strict';

angular.module('main')
.controller('LoginCtrl', ["$scope", "$state", "$log", "UserFactory", "Auth", function ($scope, $state, $log, UserFactory, Auth) {

  $scope.login = function(userInfo) {
    UserFactory.login(userInfo)
    .then(() => $state.go('tab.camera'))
    .catch($log.error);
  };

}]);


'use strict';

angular.module('main')
.controller('SignupCtrl', ["$scope", "$state", "$log", "UserFactory", function ($scope, $state, $log, UserFactory) {
  $scope.signUp = function(userInfo) {
    UserFactory.createUser(userInfo)
    .then(() => $state.go('tab.camera'))
    .catch($log.error);
  };
}]);


'use strict';

angular.module('main').directive('moment', function () {
  return {
    restrict: 'E',
    scope: {
      model: '='
    },
    templateUrl: 'js/common/directives/moment/moment.html'
  };
});

'use strict';

angular.module('main').controller('CameraCtrl', ["$rootScope", "$scope", "$state", "$cordovaCamera", function ($rootScope, $scope, $state, $cordovaCamera) {
  $rootScope.loggedIn = false;
  $scope.changeStatus = function () {
    $rootScope.loggedIn = !($rootScope.loggedIn);
  };

  $scope.goRight = function () {
  	if ($rootScope.loggedIn) $state.go('tab.group-logged-in');
  		else $state.go("tab.group-logged-out");
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
	        $scope.srcImage = "data:image/jpeg;base64," + imageData;
	    }, function(err) {
	        // error
	    });
	};
}]);


'use strict';

angular.module('main').controller('MapCtrl', ["$scope", "$state", "$cordovaGeolocation", function ($scope, $state, $cordovaGeolocation) {
  var options = {timeout: 10000, enableHighAccuracy: true};

  $cordovaGeolocation.getCurrentPosition(options).then(function(position){

    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var im = 'http://www.robotwoods.com/dev/misc/bluecircle.png';

    var userMarker = new google.maps.Marker({
      position: latLng,
      map: $scope.map,
      icon: im
    });

  }, function(error){
    console.log("Could not get location");
  });

}]);


'use strict';

angular.module('main').controller('MomentsCtrl', ["$rootScope", "$scope", "$state", function ($rootScope, $scope, $state) {
  $scope.greeting = 'Moments View';
  $scope.goToState = function (state) {
    $state.go(state);
  };
  $scope.moments = [{
    date: 'May 19th, 2016'
  },{
    date: 'May 31th, 2016'
  },{
    date: 'May 123, 2016'
  }];
}]);


'use-strict';

angular.module('main')
.directive('dragBack', ["$ionicGesture", "$state", function($ionicGesture, $state) {
  return {
    restrict : 'EAC',
    link : function(scope, elem, attr) {
      
      console.log("Dragback Link");
      
      $ionicGesture.on('swiperight', function(event) {
      
        console.log('Got swiped!');
        event.preventDefault();
        window.history.back();
        
      }, elem);
      
    }
  }  
}])

angular.module('main')
.factory("Auth", ["$firebaseAuth", function($firebaseAuth) {
    return $firebaseAuth();
}]);

angular.module('main')
.factory('GroupFactory', ["$http", function ($http) {

  const GroupFactory = {};

  GroupFactory.createGroup = function (groupDetails) {
    return $http.post('http://localhost:1337/api/groups', groupDetails)
    .then(res => res.data);
  };

  return GroupFactory;

}]);

angular.module('main')
.factory('UserFactory', ["$firebase", function($firebase) {
  const UserFactory = {};

  UserFactory.createUser = function(userDetails) {
    return firebase.auth().createUserWithEmailAndPassword(userDetails.email, userDetails.password)
    .then(res => {
      console.log('this is the response', res);
    });
  };

  UserFactory.login = function(userDetails) {
    return firebase.auth().signInWithEmailAndPassword(userDetails.email, userDetails.password);
  };

  return UserFactory;
}]);

'use strict';

angular.module('main').controller('CreateGroupCtrl', ["$scope", "$state", "$log", "ionicTimePicker", function ($scope, $state, $log, ionicTimePicker) {

  var ipObj1 = {
    callback: function (val) {      //Mandatory
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        var selectedTime = new Date(val * 1000);
        console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
        $scope.group.expirationTime = selectedTime;
        // GroupFactory.createGroup(groupInfo)
        // .then(() => $state.go('camera'))
        // .catch($log.error);
      }
    },
    inputTime: 50400,   //Optional
    format: 12,         //Optional
    step: 15,           //Optional
    setLabel: 'Set2'    //Optional
  };


  $scope.createGroup = function(groupInfo) {
    ionicTimePicker.openTimePicker(ipObj1);


  };

}]);


'use strict';

angular.module('main').controller('JoinGroupCtrl', ["$scope", function ($scope) {

}]);


'use strict';

angular.module('main').controller('GroupLoggedInCtrl', ["$scope", function ($scope) {

}]);


'use strict';

angular.module('main').controller('GroupLoggedOutCtrl', ["$scope", "$location", function ($scope, $location) {
  $scope.goToState = function (state) {
    $state.go(state);
  };
  $scope.goLeft = function () {
  	$location.url('/tab/camera')
  }

}]);


'use strict';

angular.module('main').controller('GroupMembersCtrl', ["$scope", function ($scope) {

}]);


'use strict';

angular.module('main')
.controller('LoginCtrl', ["$scope", "$state", "$log", "UserFactory", function ($scope, $state, $log, UserFactory) {

  $scope.login = function(userInfo) {
    UserFactory.login(userInfo)
    .then(() => $state.go('tab.camera'))
    .catch($log.error);
  };

}]);


'use strict';

angular.module('main')
.controller('SignupCtrl', ["$scope", "$state", "$log", "UserFactory", function ($scope, $state, $log, UserFactory) {
  $scope.signUp = function(userInfo) {
    UserFactory.createUser(userInfo)
    .then(() => $state.go('tab.camera'))
    .catch($log.error);
  };
}]);


'use strict';

angular.module('main').directive('moment', function () {
  return {
    restrict: 'E',
    scope: {
      model: '='
    },
    templateUrl: 'js/common/directives/moment/moment.html'
  };
});

'use strict';

angular.module('main').controller('CameraCtrl', ["$rootScope", "$scope", "$state", "$cordovaCamera", function ($rootScope, $scope, $state, $cordovaCamera) {
  $rootScope.loggedIn = false;
  $scope.changeStatus = function () {
    $rootScope.loggedIn = !($rootScope.loggedIn);
  };

  $scope.goRight = function () {
  	if ($rootScope.loggedIn) $state.go('tab.group-logged-in');
  		else $state.go("tab.group-logged-out");
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
	        $scope.srcImage = "data:image/jpeg;base64," + imageData;
	    }, function(err) {
	        // error
	    });
	};
}]);


'use strict';

angular.module('main').controller('MapCtrl', ["$scope", "$state", "$cordovaGeolocation", function ($scope, $state, $cordovaGeolocation) {
  var options = {timeout: 10000, enableHighAccuracy: true};

  $cordovaGeolocation.getCurrentPosition(options).then(function(position){

    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var im = 'http://www.robotwoods.com/dev/misc/bluecircle.png';

    var userMarker = new google.maps.Marker({
      position: latLng,
      map: $scope.map,
      icon: im
    });

  }, function(error){
    console.log("Could not get location");
  });

}]);


'use strict';

angular.module('main').controller('MomentsCtrl', ["$rootScope", "$scope", "$state", function ($rootScope, $scope, $state) {
  $scope.greeting = 'Moments View';
  $scope.goToState = function (state) {
    $state.go(state);
  };
  $scope.moments = [{
    date: 'May 19th, 2016'
  },{
    date: 'May 31th, 2016'
  },{
    date: 'May 123, 2016'
  }];
}]);


'use-strict';

angular.module('main')
.directive('dragBack', ["$ionicGesture", "$state", function($ionicGesture, $state) {
  return {
    restrict : 'EAC',
    link : function(scope, elem, attr) {
      
      console.log("Dragback Link");
      
      $ionicGesture.on('swiperight', function(event) {
      
        console.log('Got swiped!');
        event.preventDefault();
        window.history.back();
        
      }, elem);
      
    }
  }  
}])

angular.module('main')
.factory("Auth", ["$firebaseAuth", function($firebaseAuth) {
    return $firebaseAuth();
}]);

angular.module('main')
.factory('GroupFactory', ["$http", function ($http) {

  const GroupFactory = {};

  GroupFactory.createGroup = function (groupDetails) {
    return $http.post('http://localhost:1337/api/groups', groupDetails)
    .then(res => res.data);
  };

  return GroupFactory;

}]);

angular.module('main')
.factory('UserFactory', ["$firebase", function($firebase) {
  const UserFactory = {};

  UserFactory.createUser = function(userDetails) {
    return firebase.auth().createUserWithEmailAndPassword(userDetails.email, userDetails.password)
    .then(res => {
      console.log('this is the response', res);
    });
  };

  UserFactory.login = function(userDetails) {
    return firebase.auth().signInWithEmailAndPassword(userDetails.email, userDetails.password);
  };

  return UserFactory;
}]);

'use strict';

angular.module('main').controller('CreateGroupCtrl', ["$scope", "$state", "$log", "ionicTimePicker", function ($scope, $state, $log, ionicTimePicker) {

  var ipObj1 = {
    callback: function (val) {      //Mandatory
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        var selectedTime = new Date(val * 1000);
        console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
        $scope.group.expirationTime = selectedTime;
        // GroupFactory.createGroup(groupInfo)
        // .then(() => $state.go('camera'))
        // .catch($log.error);
      }
    },
    inputTime: 50400,   //Optional
    format: 12,         //Optional
    step: 15,           //Optional
    setLabel: 'Set2'    //Optional
  };


  $scope.createGroup = function(groupInfo) {
    ionicTimePicker.openTimePicker(ipObj1);


  };

}]);


'use strict';

angular.module('main').controller('JoinGroupCtrl', ["$scope", function ($scope) {

}]);


'use strict';

angular.module('main').controller('GroupLoggedInCtrl', ["$scope", function ($scope) {

}]);


'use strict';

angular.module('main').controller('GroupLoggedOutCtrl', ["$scope", "$location", function ($scope, $location) {
  $scope.goToState = function (state) {
    $state.go(state);
  };
  $scope.goLeft = function () {
  	$location.url('/tab/camera')
  }

}]);


'use strict';

angular.module('main').controller('GroupMembersCtrl', ["$scope", function ($scope) {

}]);


'use strict';

angular.module('main')
.controller('LoginCtrl', ["$scope", "$state", "$log", "UserFactory", function ($scope, $state, $log, UserFactory) {

  $scope.login = function(userInfo) {
    UserFactory.login(userInfo)
    .then(() => $state.go('tab.camera'))
    .catch($log.error);
  };

}]);


'use strict';

angular.module('main')
.controller('SignupCtrl', ["$scope", "$state", "$log", "UserFactory", function ($scope, $state, $log, UserFactory) {
  $scope.signUp = function(userInfo) {
    UserFactory.createUser(userInfo)
    .then(() => $state.go('tab.camera'))
    .catch($log.error);
  };
}]);


'use strict';

angular.module('main').directive('moment', function () {
  return {
    restrict: 'E',
    scope: {
      model: '='
    },
    templateUrl: 'js/common/directives/moment/moment.html'
  };
});

'use strict';

angular.module('main').controller('CameraCtrl', ["$rootScope", "$scope", "$state", "$cordovaCamera", function ($rootScope, $scope, $state, $cordovaCamera) {
  $rootScope.loggedIn = false;
  $scope.changeStatus = function () {
    $rootScope.loggedIn = !($rootScope.loggedIn);
  };

  $scope.goRight = function () {
  	if ($rootScope.loggedIn) $state.go('tab.group-logged-in');
  		else $state.go("tab.group-logged-out");
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
	        $scope.srcImage = "data:image/jpeg;base64," + imageData;
	    }, function(err) {
	        // error
	    });
	};
}]);


'use strict';

angular.module('main').controller('MapCtrl', ["$scope", "$state", "$cordovaGeolocation", function ($scope, $state, $cordovaGeolocation) {
  var options = {timeout: 10000, enableHighAccuracy: true};

  $cordovaGeolocation.getCurrentPosition(options).then(function(position){

    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var im = 'http://www.robotwoods.com/dev/misc/bluecircle.png';

    var userMarker = new google.maps.Marker({
      position: latLng,
      map: $scope.map,
      icon: im
    });

  }, function(error){
    console.log("Could not get location");
  });

}]);


'use strict';

angular.module('main').controller('MomentsCtrl', ["$rootScope", "$scope", "$state", function ($rootScope, $scope, $state) {
  $scope.greeting = 'Moments View';
  $scope.goToState = function (state) {
    $state.go(state);
  };
  $scope.moments = [{
    date: 'May 19th, 2016'
  },{
    date: 'May 31th, 2016'
  },{
    date: 'May 123, 2016'
  }];
}]);


'use-strict';

angular.module('main')
.directive('dragBack', ["$ionicGesture", "$state", function($ionicGesture, $state) {
  return {
    restrict : 'EAC',
    link : function(scope, elem, attr) {
      
      console.log("Dragback Link");
      
      $ionicGesture.on('swiperight', function(event) {
      
        console.log('Got swiped!');
        event.preventDefault();
        window.history.back();
        
      }, elem);
      
    }
  }  
}])

angular.module('main')
.factory("Auth", ["$firebaseAuth", function($firebaseAuth) {
    return $firebaseAuth();
}]);

angular.module('main')
.factory('GroupFactory', ["$http", function ($http) {

  const GroupFactory = {};

  GroupFactory.createGroup = function (groupDetails) {
    return $http.post('http://localhost:1337/api/groups', groupDetails)
    .then(res => res.data);
  };

  return GroupFactory;

}]);

angular.module('main')
.factory('UserFactory', ["$firebase", function($firebase) {
  const UserFactory = {};

  UserFactory.createUser = function(userDetails) {
    return firebase.auth().createUserWithEmailAndPassword(userDetails.email, userDetails.password)
    .then(res => {
      console.log('this is the response', res);
    });
  };

  UserFactory.login = function(userDetails) {
    return firebase.auth().signInWithEmailAndPassword(userDetails.email, userDetails.password);
  };

  return UserFactory;
}]);

'use strict';

angular.module('main').controller('CreateGroupCtrl', ["$scope", "$state", "$log", "ionicTimePicker", function ($scope, $state, $log, ionicTimePicker) {

  var ipObj1 = {
    callback: function (val) {      //Mandatory
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        var selectedTime = new Date(val * 1000);
        console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
        $scope.group.expirationTime = selectedTime;
        // GroupFactory.createGroup(groupInfo)
        // .then(() => $state.go('camera'))
        // .catch($log.error);
      }
    },
    inputTime: 50400,   //Optional
    format: 12,         //Optional
    step: 15,           //Optional
    setLabel: 'Set2'    //Optional
  };


  $scope.createGroup = function(groupInfo) {
    ionicTimePicker.openTimePicker(ipObj1);


  };

}]);


'use strict';

angular.module('main').controller('JoinGroupCtrl', ["$scope", function ($scope) {

}]);


'use strict';

angular.module('main').controller('GroupLoggedInCtrl', ["$scope", function ($scope) {

}]);


'use strict';

angular.module('main').controller('GroupLoggedOutCtrl', ["$scope", "$location", function ($scope, $location) {
  $scope.goToState = function (state) {
    $state.go(state);
  };
  $scope.goLeft = function () {
  	$location.url('/tab/camera')
  }

}]);


'use strict';

angular.module('main').controller('GroupMembersCtrl', ["$scope", function ($scope) {

}]);


'use strict';

angular.module('main')
.controller('LoginCtrl', ["$scope", "$state", "$log", "UserFactory", function ($scope, $state, $log, UserFactory) {

  $scope.login = function(userInfo) {
    UserFactory.login(userInfo)
    .then(() => $state.go('tab.camera'))
    .catch($log.error);
  };

}]);


'use strict';

angular.module('main')
.controller('SignupCtrl', ["$scope", "$state", "$log", "UserFactory", function ($scope, $state, $log, UserFactory) {
  $scope.signUp = function(userInfo) {
    UserFactory.createUser(userInfo)
    .then(() => $state.go('tab.camera'))
    .catch($log.error);
  };
}]);


'use strict';

angular.module('main').directive('moment', function () {
  return {
    restrict: 'E',
    scope: {
      model: '='
    },
    templateUrl: 'js/common/directives/moment/moment.html'
  };
});

'use strict';

angular.module('main').controller('CameraCtrl', ["$rootScope", "$scope", "$state", "$cordovaCamera", function ($rootScope, $scope, $state, $cordovaCamera) {
  $rootScope.loggedIn = false;
  $scope.changeStatus = function () {
    $rootScope.loggedIn = !($rootScope.loggedIn);
  };

  $scope.goRight = function () {
  	if ($rootScope.loggedIn) $state.go('tab.group-logged-in');
  		else $state.go("tab.group-logged-out");
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
	        $scope.srcImage = "data:image/jpeg;base64," + imageData;
	    }, function(err) {
	        // error
	    });
	};
}]);


'use strict';

angular.module('main').controller('MapCtrl', ["$scope", "$state", "$cordovaGeolocation", function ($scope, $state, $cordovaGeolocation) {
  var options = {timeout: 10000, enableHighAccuracy: true};

  $cordovaGeolocation.getCurrentPosition(options).then(function(position){

    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var im = 'http://www.robotwoods.com/dev/misc/bluecircle.png';

    var userMarker = new google.maps.Marker({
      position: latLng,
      map: $scope.map,
      icon: im
    });

  }, function(error){
    console.log("Could not get location");
  });

}]);


'use strict';

angular.module('main').controller('MomentsCtrl', ["$rootScope", "$scope", "$state", function ($rootScope, $scope, $state) {
  $scope.greeting = 'Moments View';
  $scope.goToState = function (state) {
    $state.go(state);
  };
  $scope.moments = [{
    date: 'May 19th, 2016'
  },{
    date: 'May 31th, 2016'
  },{
    date: 'May 123, 2016'
  }];
}]);


'use-strict';

angular.module('main')
.directive('dragBack', ["$ionicGesture", "$state", function($ionicGesture, $state) {
  return {
    restrict : 'EAC',
    link : function(scope, elem, attr) {
      
      console.log("Dragback Link");
      
      $ionicGesture.on('swiperight', function(event) {
      
        console.log('Got swiped!');
        event.preventDefault();
        window.history.back();
        
      }, elem);
      
    }
  }  
}])

angular.module('main')
.factory("Auth", ["$firebaseAuth", function($firebaseAuth) {
    return $firebaseAuth();
}]);

angular.module('main')
.factory('GroupFactory', ["$http", function ($http) {

  const GroupFactory = {};

  GroupFactory.createGroup = function (groupDetails) {
    return $http.post('http://localhost:1337/api/groups', groupDetails)
    .then(res => res.data);
  };

  return GroupFactory;

}]);

angular.module('main')
.factory('UserFactory', ["$firebase", function($firebase) {
  const UserFactory = {};

  UserFactory.createUser = function(userDetails) {
    return firebase.auth().createUserWithEmailAndPassword(userDetails.email, userDetails.password)
    .then(res => {
      console.log('this is the response', res);
    });
  };

  UserFactory.login = function(userDetails) {
    return firebase.auth().signInWithEmailAndPassword(userDetails.email, userDetails.password);
  };

  return UserFactory;
}]);

'use strict';

angular.module('main').controller('CreateGroupCtrl', ["$scope", "$state", "$log", "ionicTimePicker", function ($scope, $state, $log, ionicTimePicker) {

  var ipObj1 = {
    callback: function (val) {      //Mandatory
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        var selectedTime = new Date(val * 1000);
        console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
        $scope.group.expirationTime = selectedTime;
        // GroupFactory.createGroup(groupInfo)
        // .then(() => $state.go('camera'))
        // .catch($log.error);
      }
    },
    inputTime: 50400,   //Optional
    format: 12,         //Optional
    step: 15,           //Optional
    setLabel: 'Set2'    //Optional
  };


  $scope.createGroup = function(groupInfo) {
    ionicTimePicker.openTimePicker(ipObj1);


  };

}]);


'use strict';

angular.module('main').controller('JoinGroupCtrl', ["$scope", function ($scope) {

}]);


'use strict';

angular.module('main').controller('GroupLoggedInCtrl', ["$scope", function ($scope) {

}]);


'use strict';

angular.module('main').controller('GroupLoggedOutCtrl', ["$scope", "$location", function ($scope, $location) {
  $scope.goToState = function (state) {
    $state.go(state);
  };
  $scope.goLeft = function () {
  	$location.url('/tab/camera')
  }

}]);


'use strict';

angular.module('main').controller('GroupMembersCtrl', ["$scope", function ($scope) {

}]);


'use strict';

angular.module('main')
.controller('LoginCtrl', ["$scope", "$state", "$log", "UserFactory", function ($scope, $state, $log, UserFactory) {

  $scope.login = function(userInfo) {
    UserFactory.login(userInfo)
    .then(() => $state.go('tab.camera'))
    .catch($log.error);
  };

}]);


'use strict';

angular.module('main')
.controller('SignupCtrl', ["$scope", "$state", "$log", "UserFactory", function ($scope, $state, $log, UserFactory) {
  $scope.signUp = function(userInfo) {
    UserFactory.createUser(userInfo)
    .then(() => $state.go('tab.camera'))
    .catch($log.error);
  };
}]);


'use strict';

angular.module('main').directive('moment', function () {
  return {
    restrict: 'E',
    scope: {
      model: '='
    },
    templateUrl: 'js/common/directives/moment/moment.html'
  };
});

'use strict';

angular.module('main').controller('CameraCtrl', ["$rootScope", "$scope", "$state", "$cordovaCamera", function ($rootScope, $scope, $state, $cordovaCamera) {
  $rootScope.loggedIn = false;
  $scope.changeStatus = function () {
    $rootScope.loggedIn = !($rootScope.loggedIn);
  };

  $scope.goRight = function () {
  	if ($rootScope.loggedIn) $state.go('tab.group-logged-in');
  		else $state.go("tab.group-logged-out");
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
	        $scope.srcImage = "data:image/jpeg;base64," + imageData;
	    }, function(err) {
	        // error
	    });
	};
}]);


'use strict';

angular.module('main').controller('MapCtrl', ["$scope", "$state", "$cordovaGeolocation", function ($scope, $state, $cordovaGeolocation) {
  var options = {timeout: 10000, enableHighAccuracy: true};

  $cordovaGeolocation.getCurrentPosition(options).then(function(position){

    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var im = 'http://www.robotwoods.com/dev/misc/bluecircle.png';

    var userMarker = new google.maps.Marker({
      position: latLng,
      map: $scope.map,
      icon: im
    });

  }, function(error){
    console.log("Could not get location");
  });

}]);


'use strict';

angular.module('main').controller('MomentsCtrl', ["$rootScope", "$scope", "$state", function ($rootScope, $scope, $state) {
  $scope.greeting = 'Moments View';
  $scope.goToState = function (state) {
    $state.go(state);
  };
  $scope.moments = [{
    date: 'May 19th, 2016'
  },{
    date: 'May 31th, 2016'
  },{
    date: 'May 123, 2016'
  }];
}]);


'use-strict';

angular.module('main')
.directive('dragBack', ["$ionicGesture", "$state", function($ionicGesture, $state) {
  return {
    restrict : 'EAC',
    link : function(scope, elem, attr) {
      
      console.log("Dragback Link");
      
      $ionicGesture.on('swiperight', function(event) {
      
        console.log('Got swiped!');
        event.preventDefault();
        window.history.back();
        
      }, elem);
      
    }
  }  
}])

angular.module('main')
.factory("Auth", ["$firebaseAuth", function($firebaseAuth) {
    return $firebaseAuth();
}]);

angular.module('main')
.factory('GroupFactory', ["$http", function ($http) {

  const GroupFactory = {};

  GroupFactory.createGroup = function (groupDetails) {
    return $http.post('http://localhost:1337/api/groups', groupDetails)
    .then(res => res.data);
  };

  return GroupFactory;

}]);

angular.module('main')
.factory('UserFactory', ["$firebase", function($firebase) {
  const UserFactory = {};

  UserFactory.createUser = function(userDetails) {
    return firebase.auth().createUserWithEmailAndPassword(userDetails.email, userDetails.password)
    .then(res => {
      console.log('this is the response', res);
    });
  };

  UserFactory.login = function(userDetails) {
    return firebase.auth().signInWithEmailAndPassword(userDetails.email, userDetails.password);
  };

  return UserFactory;
}]);

'use strict';

angular.module('main').controller('JoinGroupCtrl', ["$scope", function ($scope) {

}]);


'use strict';

angular.module('main').controller('CreateGroupCtrl', ["$scope", "$state", "$log", "ionicTimePicker", function ($scope, $state, $log, ionicTimePicker) {

  var ipObj1 = {
    callback: function (val) {      //Mandatory
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        var selectedTime = new Date(val * 1000);
        console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
        $scope.group.expirationTime = selectedTime;
        // GroupFactory.createGroup(groupInfo)
        // .then(() => $state.go('camera'))
        // .catch($log.error);
      }
    },
    inputTime: 50400,   //Optional
    format: 12,         //Optional
    step: 15,           //Optional
    setLabel: 'Set2'    //Optional
  };


  $scope.createGroup = function(groupInfo) {
    ionicTimePicker.openTimePicker(ipObj1);


  };

}]);


'use strict';

angular.module('main').controller('GroupLoggedInCtrl', ["$scope", function ($scope) {

}]);


'use strict';

angular.module('main').controller('GroupLoggedOutCtrl', ["$scope", "$location", function ($scope, $location) {
  $scope.goToState = function (state) {
    $state.go(state);
  };
  $scope.goLeft = function () {
  	$location.url('/tab/camera')
  }

}]);


'use strict';

angular.module('main').controller('GroupMembersCtrl', ["$scope", function ($scope) {

}]);


'use strict';

angular.module('main')
.controller('LoginCtrl', ["$scope", "$state", "$log", "UserFactory", function ($scope, $state, $log, UserFactory) {

  $scope.login = function(userInfo) {
    UserFactory.login(userInfo)
    .then(() => $state.go('tab.camera'))
    .catch($log.error);
  };

}]);


'use strict';

angular.module('main')
.controller('SignupCtrl', ["$scope", "$state", "$log", "UserFactory", function ($scope, $state, $log, UserFactory) {
  $scope.signUp = function(userInfo) {
    UserFactory.createUser(userInfo)
    .then(() => $state.go('tab.camera'))
    .catch($log.error);
  };
}]);


'use strict';

angular.module('main').directive('moment', function () {
  return {
    restrict: 'E',
    scope: {
      model: '='
    },
    templateUrl: 'js/common/directives/moment/moment.html'
  };
});

'use strict';

angular.module('main').controller('CameraCtrl', ["$rootScope", "$scope", "$state", "$cordovaCamera", function ($rootScope, $scope, $state, $cordovaCamera) {
  $rootScope.loggedIn = false;
  $scope.changeStatus = function () {
    $rootScope.loggedIn = !($rootScope.loggedIn);
  };

  $scope.goRight = function () {
  	if ($rootScope.loggedIn) $state.go('tab.group-logged-in');
  		else $state.go("tab.group-logged-out");
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
	        $scope.srcImage = "data:image/jpeg;base64," + imageData;
	    }, function(err) {
	        // error
	    });
	};
}]);


'use strict';

angular.module('main').controller('MomentsCtrl', ["$rootScope", "$scope", "$state", function ($rootScope, $scope, $state) {
  $scope.greeting = 'Moments View';
  $scope.goToState = function (state) {
    $state.go(state);
  };
  $scope.moments = [{
    date: 'May 19th, 2016'
  },{
    date: 'May 31th, 2016'
  },{
    date: 'May 123, 2016'
  }];
}]);


'use strict';

angular.module('main').controller('MapCtrl', ["$scope", "$state", "$cordovaGeolocation", function ($scope, $state, $cordovaGeolocation) {
  var options = {timeout: 10000, enableHighAccuracy: true};

  $cordovaGeolocation.getCurrentPosition(options).then(function(position){

    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var im = 'http://www.robotwoods.com/dev/misc/bluecircle.png';

    var userMarker = new google.maps.Marker({
      position: latLng,
      map: $scope.map,
      icon: im
    });

  }, function(error){
    console.log("Could not get location");
  });

}]);


'use-strict';

angular.module('main')
.directive('dragBack', ["$ionicGesture", "$state", function($ionicGesture, $state) {
  return {
    restrict : 'EAC',
    link : function(scope, elem, attr) {
      
      console.log("Dragback Link");
      
      $ionicGesture.on('swiperight', function(event) {
      
        console.log('Got swiped!');
        event.preventDefault();
        window.history.back();
        
      }, elem);
      
    }
  }  
}])

angular.module('main')
.factory("Auth", ["$firebaseAuth", function($firebaseAuth) {
    return $firebaseAuth();
}]);

angular.module('main')
.factory('GroupFactory', ["$http", function ($http) {

  const GroupFactory = {};

  GroupFactory.createGroup = function (groupDetails) {
    return $http.post('http://localhost:1337/api/groups', groupDetails)
    .then(res => res.data);
  };

  return GroupFactory;

}]);

angular.module('main')
.factory('UserFactory', ["$firebase", function($firebase) {
  const UserFactory = {};

  UserFactory.createUser = function(userDetails) {
    return firebase.auth().createUserWithEmailAndPassword(userDetails.email, userDetails.password)
    .then(res => {
      console.log('this is the response', res);
    });
  };

  UserFactory.login = function(userDetails) {
    return firebase.auth().signInWithEmailAndPassword(userDetails.email, userDetails.password);
  };

  return UserFactory;
}]);

'use strict';

angular.module('main').controller('CreateGroupCtrl', ["$scope", "$state", "$log", "ionicTimePicker", function ($scope, $state, $log, ionicTimePicker) {

  var ipObj1 = {
    callback: function (val) {      //Mandatory
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        var selectedTime = new Date(val * 1000);
        console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
        $scope.group.expirationTime = selectedTime;
        // GroupFactory.createGroup(groupInfo)
        // .then(() => $state.go('camera'))
        // .catch($log.error);
      }
    },
    inputTime: 50400,   //Optional
    format: 12,         //Optional
    step: 15,           //Optional
    setLabel: 'Set2'    //Optional
  };


  $scope.createGroup = function(groupInfo) {
    ionicTimePicker.openTimePicker(ipObj1);


  };

}]);


'use strict';

angular.module('main').controller('JoinGroupCtrl', ["$scope", function ($scope) {

}]);


'use strict';

angular.module('main').controller('GroupLoggedInCtrl', ["$scope", function ($scope) {

}]);


'use strict';

angular.module('main').controller('GroupLoggedOutCtrl', ["$scope", "$location", function ($scope, $location) {
  $scope.goToState = function (state) {
    $state.go(state);
  };
  $scope.goLeft = function () {
  	$location.url('/tab/camera')
  }

}]);


'use strict';

angular.module('main').controller('GroupMembersCtrl', ["$scope", function ($scope) {

}]);


'use strict';

angular.module('main')
.controller('LoginCtrl', ["$scope", "$state", "$log", "UserFactory", function ($scope, $state, $log, UserFactory) {

  $scope.login = function(userInfo) {
    UserFactory.login(userInfo)
    .then(() => $state.go('tab.camera'))
    .catch($log.error);
  };

}]);


'use strict';

angular.module('main')
.controller('SignupCtrl', ["$scope", "$state", "$log", "UserFactory", function ($scope, $state, $log, UserFactory) {
  $scope.signUp = function(userInfo) {
    UserFactory.createUser(userInfo)
    .then(() => $state.go('tab.camera'))
    .catch($log.error);
  };
}]);


'use strict';

angular.module('main').directive('moment', function () {
  return {
    restrict: 'E',
    scope: {
      model: '='
    },
    templateUrl: 'js/common/directives/moment/moment.html'
  };
});

'use strict';

angular.module('main').controller('CameraCtrl', ["$rootScope", "$scope", "$state", "$cordovaCamera", function ($rootScope, $scope, $state, $cordovaCamera) {
  $rootScope.loggedIn = false;
  $scope.changeStatus = function () {
    $rootScope.loggedIn = !($rootScope.loggedIn);
  };

  $scope.goRight = function () {
  	if ($rootScope.loggedIn) $state.go('tab.group-logged-in');
  		else $state.go("tab.group-logged-out");
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
	        $scope.srcImage = "data:image/jpeg;base64," + imageData;
	    }, function(err) {
	        // error
	    });
	};
}]);


'use strict';

angular.module('main').controller('MapCtrl', ["$scope", "$state", "$cordovaGeolocation", function ($scope, $state, $cordovaGeolocation) {
  var options = {timeout: 10000, enableHighAccuracy: true};

  $cordovaGeolocation.getCurrentPosition(options).then(function(position){

    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var im = 'http://www.robotwoods.com/dev/misc/bluecircle.png';

    var userMarker = new google.maps.Marker({
      position: latLng,
      map: $scope.map,
      icon: im
    });

  }, function(error){
    console.log("Could not get location");
  });

}]);


'use strict';

angular.module('main').controller('MomentsCtrl', ["$rootScope", "$scope", "$state", function ($rootScope, $scope, $state) {
  $scope.greeting = 'Moments View';
  $scope.goToState = function (state) {
    $state.go(state);
  };
  $scope.moments = [{
    date: 'May 19th, 2016'
  },{
    date: 'May 31th, 2016'
  },{
    date: 'May 123, 2016'
  }];
}]);


'use-strict';

angular.module('main')
.directive('dragBack', ["$ionicGesture", "$state", function($ionicGesture, $state) {
  return {
    restrict : 'EAC',
    link : function(scope, elem, attr) {
      
      console.log("Dragback Link");
      
      $ionicGesture.on('swiperight', function(event) {
      
        console.log('Got swiped!');
        event.preventDefault();
        window.history.back();
        
      }, elem);
      
    }
  }  
}])

'use strict';

angular.module('main').controller('CreateGroupCtrl', ["$scope", "$state", "$log", "ionicTimePicker", function ($scope, $state, $log, ionicTimePicker) {

  var ipObj1 = {
    callback: function (val) {      //Mandatory
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        var selectedTime = new Date(val * 1000);
        console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
        $scope.group.expirationTime = selectedTime;
        // GroupFactory.createGroup(groupInfo)
        // .then(() => $state.go('camera'))
        // .catch($log.error);
      }
    },
    inputTime: 50400,   //Optional
    format: 12,         //Optional
    step: 15,           //Optional
    setLabel: 'Set2'    //Optional
  };


  $scope.createGroup = function(groupInfo) {
    ionicTimePicker.openTimePicker(ipObj1);


  };

}]);


'use strict';

angular.module('main').controller('JoinGroupCtrl', ["$scope", function ($scope) {

}]);


'use strict';

angular.module('main').controller('GroupLoggedInCtrl', ["$scope", function ($scope) {

}]);


'use strict';

angular.module('main').controller('GroupLoggedOutCtrl', ["$scope", "$location", function ($scope, $location) {
  $scope.goToState = function (state) {
    $state.go(state);
  };
  $scope.goLeft = function () {
  	$location.url('/tab/camera')
  }

}]);


'use strict';

angular.module('main').controller('GroupMembersCtrl', ["$scope", function ($scope) {

}]);


angular.module('main')
.factory("Auth", ["$firebaseAuth", function($firebaseAuth) {
    return $firebaseAuth();
}]);

angular.module('main')
.factory('GroupFactory', ["$http", function ($http) {

  const GroupFactory = {};

  GroupFactory.createGroup = function (groupDetails) {
    return $http.post('http://localhost:1337/api/groups', groupDetails)
    .then(res => res.data);
  };

  return GroupFactory;

}]);

angular.module('main')
.factory('UserFactory', ["$firebase", function($firebase) {
  const UserFactory = {};

  UserFactory.createUser = function(userDetails) {
    return firebase.auth().createUserWithEmailAndPassword(userDetails.email, userDetails.password)
    .then(res => {
      console.log('this is the response', res);
    });
  };

  UserFactory.login = function(userDetails) {
    return firebase.auth().signInWithEmailAndPassword(userDetails.email, userDetails.password);
  };

  return UserFactory;
}]);

'use strict';

angular.module('main')
.controller('LoginCtrl', ["$scope", "$state", "$log", "UserFactory", function ($scope, $state, $log, UserFactory) {

  $scope.login = function(userInfo) {
    UserFactory.login(userInfo)
    .then(() => $state.go('tab.camera'))
    .catch($log.error);
  };

}]);


'use strict';

angular.module('main')
.controller('SignupCtrl', ["$scope", "$state", "$log", "UserFactory", function ($scope, $state, $log, UserFactory) {
  $scope.signUp = function(userInfo) {
    UserFactory.createUser(userInfo)
    .then(() => $state.go('tab.camera'))
    .catch($log.error);
  };
}]);


'use strict';

angular.module('main').directive('moment', function () {
  return {
    restrict: 'E',
    scope: {
      model: '='
    },
    templateUrl: 'js/common/directives/moment/moment.html'
  };
});

'use strict';

angular.module('main').controller('CameraCtrl', ["$rootScope", "$scope", "$state", "$cordovaCamera", function ($rootScope, $scope, $state, $cordovaCamera) {
  $rootScope.loggedIn = false;
  $scope.changeStatus = function () {
    $rootScope.loggedIn = !($rootScope.loggedIn);
  };

  $scope.goRight = function () {
  	if ($rootScope.loggedIn) $state.go('tab.group-logged-in');
  		else $state.go("tab.group-logged-out");
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
	        $scope.srcImage = "data:image/jpeg;base64," + imageData;
	    }, function(err) {
	        // error
	    });
	};
}]);


'use strict';

angular.module('main').controller('MapCtrl', ["$scope", "$state", "$cordovaGeolocation", function ($scope, $state, $cordovaGeolocation) {
  var options = {timeout: 10000, enableHighAccuracy: true};

  $cordovaGeolocation.getCurrentPosition(options).then(function(position){

    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var im = 'http://www.robotwoods.com/dev/misc/bluecircle.png';

    var userMarker = new google.maps.Marker({
      position: latLng,
      map: $scope.map,
      icon: im
    });

  }, function(error){
    console.log("Could not get location");
  });

}]);


'use strict';

angular.module('main').controller('MomentsCtrl', ["$rootScope", "$scope", "$state", function ($rootScope, $scope, $state) {
  $scope.greeting = 'Moments View';
  $scope.goToState = function (state) {
    $state.go(state);
  };
  $scope.moments = [{
    date: 'May 19th, 2016'
  },{
    date: 'May 31th, 2016'
  },{
    date: 'May 123, 2016'
  }];
}]);


'use-strict';

angular.module('main')
.directive('dragBack', ["$ionicGesture", "$state", function($ionicGesture, $state) {
  return {
    restrict : 'EAC',
    link : function(scope, elem, attr) {
      
      console.log("Dragback Link");
      
      $ionicGesture.on('swiperight', function(event) {
      
        console.log('Got swiped!');
        event.preventDefault();
        window.history.back();
        
      }, elem);
      
    }
  }  
}])

angular.module('main')
.factory("Auth", ["$firebaseAuth", function($firebaseAuth) {
    return $firebaseAuth();
}]);

angular.module('main')
.factory('GroupFactory', ["$http", function ($http) {

  const GroupFactory = {};

  GroupFactory.createGroup = function (groupDetails) {
    return $http.post('http://localhost:1337/api/groups', groupDetails)
    .then(res => res.data);
  };

  return GroupFactory;

}]);

angular.module('main')
.factory('UserFactory', ["$firebase", function($firebase) {
  const UserFactory = {};

  UserFactory.createUser = function(userDetails) {
    return firebase.auth().createUserWithEmailAndPassword(userDetails.email, userDetails.password)
    .then(res => {
      console.log('this is the response', res);
    });
  };

  UserFactory.login = function(userDetails) {
    return firebase.auth().signInWithEmailAndPassword(userDetails.email, userDetails.password);
  };

  return UserFactory;
}]);

'use strict';

angular.module('main').controller('CreateGroupCtrl', ["$scope", "$state", "$log", "ionicTimePicker", function ($scope, $state, $log, ionicTimePicker) {

  var ipObj1 = {
    callback: function (val) {      //Mandatory
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        var selectedTime = new Date(val * 1000);
        console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
        $scope.group.expirationTime = selectedTime;
        // GroupFactory.createGroup(groupInfo)
        // .then(() => $state.go('camera'))
        // .catch($log.error);
      }
    },
    inputTime: 50400,   //Optional
    format: 12,         //Optional
    step: 15,           //Optional
    setLabel: 'Set2'    //Optional
  };


  $scope.createGroup = function(groupInfo) {
    ionicTimePicker.openTimePicker(ipObj1);


  };

}]);


'use strict';

angular.module('main').controller('JoinGroupCtrl', ["$scope", function ($scope) {

}]);


'use strict';

angular.module('main').controller('GroupLoggedInCtrl', ["$scope", function ($scope) {

}]);


'use strict';

angular.module('main').controller('GroupLoggedOutCtrl', ["$scope", "$location", function ($scope, $location) {
  $scope.goToState = function (state) {
    $state.go(state);
  };
  $scope.goLeft = function () {
  	$location.url('/tab/camera')
  }

}]);


'use strict';

angular.module('main').controller('GroupMembersCtrl', ["$scope", function ($scope) {

}]);


'use strict';

angular.module('main')
.controller('LoginCtrl', ["$scope", "$state", "$log", "UserFactory", function ($scope, $state, $log, UserFactory) {

  $scope.login = function(userInfo) {
    UserFactory.login(userInfo)
    .then(() => $state.go('tab.camera'))
    .catch($log.error);
  };

}]);


'use strict';

angular.module('main')
.controller('SignupCtrl', ["$scope", "$state", "$log", "UserFactory", function ($scope, $state, $log, UserFactory) {
  $scope.signUp = function(userInfo) {
    UserFactory.createUser(userInfo)
    .then(() => $state.go('tab.camera'))
    .catch($log.error);
  };
}]);


'use strict';

angular.module('main').directive('moment', function () {
  return {
    restrict: 'E',
    scope: {
      model: '='
    },
    templateUrl: 'js/common/directives/moment/moment.html'
  };
});

'use strict';

angular.module('main').controller('CameraCtrl', ["$rootScope", "$scope", "$state", "$cordovaCamera", function ($rootScope, $scope, $state, $cordovaCamera) {
  $rootScope.loggedIn = false;
  $scope.changeStatus = function () {
    $rootScope.loggedIn = !($rootScope.loggedIn);
  };

  $scope.goRight = function () {
  	if ($rootScope.loggedIn) $state.go('tab.group-logged-in');
  		else $state.go("tab.group-logged-out");
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
	        $scope.srcImage = "data:image/jpeg;base64," + imageData;
	    }, function(err) {
	        // error
	    });
	};
}]);


'use strict';

angular.module('main').controller('MapCtrl', ["$scope", "$state", "$cordovaGeolocation", function ($scope, $state, $cordovaGeolocation) {
  var options = {timeout: 10000, enableHighAccuracy: true};

  $cordovaGeolocation.getCurrentPosition(options).then(function(position){

    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var im = 'http://www.robotwoods.com/dev/misc/bluecircle.png';

    var userMarker = new google.maps.Marker({
      position: latLng,
      map: $scope.map,
      icon: im
    });

  }, function(error){
    console.log("Could not get location");
  });

}]);


'use strict';

angular.module('main').controller('MomentsCtrl', ["$rootScope", "$scope", "$state", function ($rootScope, $scope, $state) {
  $scope.greeting = 'Moments View';
  $scope.goToState = function (state) {
    $state.go(state);
  };
  $scope.moments = [{
    date: 'May 19th, 2016'
  },{
    date: 'May 31th, 2016'
  },{
    date: 'May 123, 2016'
  }];
}]);


'use-strict';

angular.module('main')
.directive('dragBack', ["$ionicGesture", "$state", function($ionicGesture, $state) {
  return {
    restrict : 'EAC',
    link : function(scope, elem, attr) {
      
      console.log("Dragback Link");
      
      $ionicGesture.on('swiperight', function(event) {
      
        console.log('Got swiped!');
        event.preventDefault();
        window.history.back();
        
      }, elem);
      
    }
  }  
}])

angular.module('main')
.factory("Auth", ["$firebaseAuth", function($firebaseAuth) {
    return $firebaseAuth();
}]);

angular.module('main')
.factory('GroupFactory', ["$http", function ($http) {

  const GroupFactory = {};

  GroupFactory.createGroup = function (groupDetails) {
    return $http.post('http://localhost:1337/api/groups', groupDetails)
    .then(res => res.data);
  };

  return GroupFactory;

}]);

angular.module('main')
.factory('UserFactory', ["$firebase", function($firebase) {
  const UserFactory = {};

  UserFactory.createUser = function(userDetails) {
    return firebase.auth().createUserWithEmailAndPassword(userDetails.email, userDetails.password)
    .then(res => {
      console.log('this is the response', res);
    });
  };

  UserFactory.login = function(userDetails) {
    return firebase.auth().signInWithEmailAndPassword(userDetails.email, userDetails.password);
  };

  return UserFactory;
}]);

'use strict';

angular.module('main').controller('CreateGroupCtrl', ["$scope", "$state", "$log", "ionicTimePicker", function ($scope, $state, $log, ionicTimePicker) {

  var ipObj1 = {
    callback: function (val) {      //Mandatory
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        var selectedTime = new Date(val * 1000);
        console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
        $scope.group.expirationTime = selectedTime;
        // GroupFactory.createGroup(groupInfo)
        // .then(() => $state.go('camera'))
        // .catch($log.error);
      }
    },
    inputTime: 50400,   //Optional
    format: 12,         //Optional
    step: 15,           //Optional
    setLabel: 'Set2'    //Optional
  };


  $scope.createGroup = function(groupInfo) {
    ionicTimePicker.openTimePicker(ipObj1);


  };

}]);


'use strict';

angular.module('main').controller('JoinGroupCtrl', ["$scope", function ($scope) {

}]);


'use strict';

angular.module('main').controller('GroupLoggedInCtrl', ["$scope", function ($scope) {

}]);


'use strict';

angular.module('main').controller('GroupLoggedOutCtrl', ["$scope", "$location", function ($scope, $location) {
  $scope.goToState = function (state) {
    $state.go(state);
  };
  $scope.goLeft = function () {
  	$location.url('/tab/camera')
  }

}]);


'use strict';

angular.module('main').controller('GroupMembersCtrl', ["$scope", function ($scope) {

}]);


'use strict';

angular.module('main')
.controller('LoginCtrl', ["$scope", "$state", "$log", "UserFactory", function ($scope, $state, $log, UserFactory) {

  $scope.login = function(userInfo) {
    UserFactory.login(userInfo)
    .then(() => $state.go('tab.camera'))
    .catch($log.error);
  };

}]);

'use strict';

angular.module('main')
.controller('SignupCtrl', ["$scope", "$state", "$log", "UserFactory", function ($scope, $state, $log, UserFactory) {
  $scope.signUp = function(userInfo) {
    UserFactory.createUser(userInfo)
    .then(() => $state.go('tab.camera'))
    .catch($log.error);
  };
}]);


'use strict';

angular.module('main').directive('moment', function () {
  return {
    restrict: 'E',
    scope: {
      model: '='
    },
    templateUrl: 'js/common/directives/moment/moment.html'
  };
});

'use strict';

angular.module('main').controller('CameraCtrl', ["$rootScope", "$scope", "$state", "$cordovaCamera", function ($rootScope, $scope, $state, $cordovaCamera) {
  $rootScope.loggedIn = false;
  $scope.changeStatus = function () {
    $rootScope.loggedIn = !($rootScope.loggedIn);
  };

  $scope.goRight = function () {
  	if ($rootScope.loggedIn) $state.go('tab.group-logged-in');
  		else $state.go("tab.group-logged-out");
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
	        $scope.srcImage = "data:image/jpeg;base64," + imageData;
	    }, function(err) {
	        // error
	    });
	};
}]);


'use strict';

angular.module('main').controller('MapCtrl', ["$scope", "$state", "$cordovaGeolocation", function ($scope, $state, $cordovaGeolocation) {
  var options = {timeout: 10000, enableHighAccuracy: true};

  $cordovaGeolocation.getCurrentPosition(options).then(function(position){

    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var im = 'http://www.robotwoods.com/dev/misc/bluecircle.png';

    var userMarker = new google.maps.Marker({
      position: latLng,
      map: $scope.map,
      icon: im
    });

  }, function(error){
    console.log("Could not get location");
  });

}]);


'use strict';

angular.module('main').controller('MomentsCtrl', ["$rootScope", "$scope", "$state", function ($rootScope, $scope, $state) {
  $scope.greeting = 'Moments View';
  $scope.goToState = function (state) {
    $state.go(state);
  };
  $scope.moments = [{
    date: 'May 19th, 2016'
  },{
    date: 'May 31th, 2016'
  },{
    date: 'May 123, 2016'
  }];
}]);


'use-strict';

angular.module('main')
.directive('dragBack', ["$ionicGesture", "$state", function($ionicGesture, $state) {
  return {
    restrict : 'EAC',
    link : function(scope, elem, attr) {
      
      console.log("Dragback Link");
      
      $ionicGesture.on('swiperight', function(event) {
      
        console.log('Got swiped!');
        event.preventDefault();
        window.history.back();
        
      }, elem);
      
    }
  }  
}])

angular.module('main')
.factory("Auth", ["$firebaseAuth", function($firebaseAuth) {
    return $firebaseAuth();
}]);

angular.module('main')
.factory('GroupFactory', ["$http", function ($http) {

  const GroupFactory = {};

  GroupFactory.createGroup = function (groupDetails) {
    return $http.post('http://localhost:1337/api/groups', groupDetails)
    .then(res => res.data);
  };

  return GroupFactory;

}]);

angular.module('main')
.factory('UserFactory', ["$firebase", function($firebase) {
  const UserFactory = {};

  UserFactory.createUser = function(userDetails) {
    return firebase.auth().createUserWithEmailAndPassword(userDetails.email, userDetails.password)
    .then(res => {
      console.log('this is the response', res);
    });
  };

  UserFactory.login = function(userDetails) {
    return firebase.auth().signInWithEmailAndPassword(userDetails.email, userDetails.password);
  };

  return UserFactory;
}]);

'use strict';

angular.module('main').controller('CreateGroupCtrl', ["$scope", "$state", "$log", "ionicTimePicker", function ($scope, $state, $log, ionicTimePicker) {

  var ipObj1 = {
    callback: function (val) {      //Mandatory
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        var selectedTime = new Date(val * 1000);
        console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
        $scope.group.expirationTime = selectedTime;
        // GroupFactory.createGroup(groupInfo)
        // .then(() => $state.go('camera'))
        // .catch($log.error);
      }
    },
    inputTime: 50400,   //Optional
    format: 12,         //Optional
    step: 15,           //Optional
    setLabel: 'Set2'    //Optional
  };


  $scope.createGroup = function(groupInfo) {
    ionicTimePicker.openTimePicker(ipObj1);


  };

}]);


'use strict';

angular.module('main').controller('JoinGroupCtrl', ["$scope", function ($scope) {

}]);


'use strict';

angular.module('main').controller('GroupLoggedInCtrl', ["$scope", function ($scope) {

}]);


'use strict';

angular.module('main').controller('GroupLoggedOutCtrl', ["$scope", "$location", function ($scope, $location) {
  $scope.goToState = function (state) {
    $state.go(state);
  };
  $scope.goLeft = function () {
  	$location.url('/tab/camera')
  }

}]);


'use strict';

angular.module('main').controller('GroupMembersCtrl', ["$scope", function ($scope) {

}]);


'use strict';

angular.module('main')
.controller('LoginCtrl', ["$scope", "$state", "$log", "UserFactory", function ($scope, $state, $log, UserFactory) {

  $scope.login = function(userInfo) {
    UserFactory.login(userInfo)
    .then(() => $state.go('tab.camera'))
    .catch($log.error);
  };

}]);

'use strict';

angular.module('main')
.controller('SignupCtrl', ["$scope", "$state", "$log", "UserFactory", function ($scope, $state, $log, UserFactory) {
  $scope.signUp = function(userInfo) {
    UserFactory.createUser(userInfo)
    .then(() => $state.go('tab.camera'))
    .catch($log.error);
  };
}]);


'use strict';

angular.module('main').directive('moment', function () {
  return {
    restrict: 'E',
    scope: {
      model: '='
    },
    templateUrl: 'js/common/directives/moment/moment.html'
  };
});

'use strict';

angular.module('main').controller('CameraCtrl', ["$rootScope", "$scope", "$state", "$cordovaCamera", function ($rootScope, $scope, $state, $cordovaCamera) {
  $rootScope.loggedIn = false;
  $scope.changeStatus = function () {
    $rootScope.loggedIn = !($rootScope.loggedIn);
  };

  $scope.goRight = function () {
  	if ($rootScope.loggedIn) $state.go('tab.group-logged-in');
  		else $state.go("tab.group-logged-out");
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
	        $scope.srcImage = "data:image/jpeg;base64," + imageData;
	    }, function(err) {
	        // error
	    });
	};
}]);


'use strict';

angular.module('main').controller('MapCtrl', ["$scope", "$state", "$cordovaGeolocation", function ($scope, $state, $cordovaGeolocation) {
  var options = {timeout: 10000, enableHighAccuracy: true};

  $cordovaGeolocation.getCurrentPosition(options).then(function(position){

    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var im = 'http://www.robotwoods.com/dev/misc/bluecircle.png';

    var userMarker = new google.maps.Marker({
      position: latLng,
      map: $scope.map,
      icon: im
    });

  }, function(error){
    console.log("Could not get location");
  });

}]);


'use strict';

angular.module('main').controller('MomentsCtrl', ["$rootScope", "$scope", "$state", function ($rootScope, $scope, $state) {
  $scope.greeting = 'Moments View';
  $scope.goToState = function (state) {
    $state.go(state);
  };
  $scope.moments = [{
    date: 'May 19th, 2016'
  },{
    date: 'May 31th, 2016'
  },{
    date: 'May 123, 2016'
  }];
}]);


'use-strict';

angular.module('main')
.directive('dragBack', ["$ionicGesture", "$state", function($ionicGesture, $state) {
  return {
    restrict : 'EAC',
    link : function(scope, elem, attr) {
      
      console.log("Dragback Link");
      
      $ionicGesture.on('swiperight', function(event) {
      
        console.log('Got swiped!');
        event.preventDefault();
        window.history.back();
        
      }, elem);
      
    }
  }  
}])

angular.module('main')
.factory("Auth", ["$firebaseAuth", function($firebaseAuth) {
    return $firebaseAuth();
}]);

angular.module('main')
.factory('GroupFactory', ["$http", function ($http) {

  const GroupFactory = {};

  GroupFactory.createGroup = function (groupDetails) {
    return $http.post('http://localhost:1337/api/groups', groupDetails)
    .then(res => res.data);
  };

  return GroupFactory;

}]);

angular.module('main')
.factory('UserFactory', ["$firebase", function($firebase) {
  const UserFactory = {};

  UserFactory.createUser = function(userDetails) {
    return firebase.auth().createUserWithEmailAndPassword(userDetails.email, userDetails.password)
    .then(res => {
      console.log('this is the response', res);
    });
  };

  UserFactory.login = function(userDetails) {
    return firebase.auth().signInWithEmailAndPassword(userDetails.email, userDetails.password);
  };

  return UserFactory;
}]);

'use strict';

angular.module('main').controller('CreateGroupCtrl', ["$scope", "$state", "$log", "ionicTimePicker", function ($scope, $state, $log, ionicTimePicker) {

  var ipObj1 = {
    callback: function (val) {      //Mandatory
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        var selectedTime = new Date(val * 1000);
        console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
        $scope.group.expirationTime = selectedTime;
        // GroupFactory.createGroup(groupInfo)
        // .then(() => $state.go('camera'))
        // .catch($log.error);
      }
    },
    inputTime: 50400,   //Optional
    format: 12,         //Optional
    step: 15,           //Optional
    setLabel: 'Set2'    //Optional
  };


  $scope.createGroup = function(groupInfo) {
    ionicTimePicker.openTimePicker(ipObj1);


  };

}]);


'use strict';

angular.module('main').controller('JoinGroupCtrl', ["$scope", function ($scope) {

}]);


'use strict';

angular.module('main').controller('GroupLoggedInCtrl', ["$scope", function ($scope) {

}]);


'use strict';

angular.module('main').controller('GroupLoggedOutCtrl', ["$scope", "$location", function ($scope, $location) {
  $scope.goToState = function (state) {
    $state.go(state);
  };
  $scope.goLeft = function () {
  	$location.url('/tab/camera')
  }

}]);


'use strict';

angular.module('main').controller('GroupMembersCtrl', ["$scope", function ($scope) {

}]);


'use strict';

angular.module('main')
.controller('LoginCtrl', ["$scope", "$state", "$log", "Atuh", function ($scope, $state, $log, Atuh) {

  $scope.login = function(userInfo) {
    UserFactory.login(userInfo)
    .then(() => $state.go('tab.camera'))
    .catch($log.error);
  };

}]);

'use strict';

angular.module('main')
.controller('SignupCtrl', ["$scope", "$state", "$log", "UserFactory", function ($scope, $state, $log, UserFactory) {
  $scope.signUp = function(userInfo) {
    UserFactory.createUser(userInfo)
    .then(() => $state.go('tab.camera'))
    .catch($log.error);
  };
}]);


'use strict';

angular.module('main').directive('moment', function () {
  return {
    restrict: 'E',
    scope: {
      model: '='
    },
    templateUrl: 'js/common/directives/moment/moment.html'
  };
});

'use strict';

angular.module('main').controller('CameraCtrl', ["$rootScope", "$scope", "$state", "$cordovaCamera", function ($rootScope, $scope, $state, $cordovaCamera) {
  $rootScope.loggedIn = false;
  $scope.changeStatus = function () {
    $rootScope.loggedIn = !($rootScope.loggedIn);
  };

  $scope.goRight = function () {
  	if ($rootScope.loggedIn) $state.go('tab.group-logged-in');
  		else $state.go("tab.group-logged-out");
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
	        $scope.srcImage = "data:image/jpeg;base64," + imageData;
	    }, function(err) {
	        // error
	    });
	};
}]);


'use strict';

angular.module('main').controller('MapCtrl', ["$scope", "$state", "$cordovaGeolocation", function ($scope, $state, $cordovaGeolocation) {
  var options = {timeout: 10000, enableHighAccuracy: true};

  $cordovaGeolocation.getCurrentPosition(options).then(function(position){

    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var im = 'http://www.robotwoods.com/dev/misc/bluecircle.png';

    var userMarker = new google.maps.Marker({
      position: latLng,
      map: $scope.map,
      icon: im
    });

  }, function(error){
    console.log("Could not get location");
  });

}]);


'use strict';

angular.module('main').controller('MomentsCtrl', ["$rootScope", "$scope", "$state", function ($rootScope, $scope, $state) {
  $scope.greeting = 'Moments View';
  $scope.goToState = function (state) {
    $state.go(state);
  };
  $scope.moments = [{
    date: 'May 19th, 2016'
  },{
    date: 'May 31th, 2016'
  },{
    date: 'May 123, 2016'
  }];
}]);


'use-strict';

angular.module('main')
.directive('dragBack', ["$ionicGesture", "$state", function($ionicGesture, $state) {
  return {
    restrict : 'EAC',
    link : function(scope, elem, attr) {
      
      console.log("Dragback Link");
      
      $ionicGesture.on('swiperight', function(event) {
      
        console.log('Got swiped!');
        event.preventDefault();
        window.history.back();
        
      }, elem);
      
    }
  }  
}])

angular.module('main')
.factory("Auth", ["$firebaseAuth", function($firebaseAuth) {
    return $firebaseAuth();
}]);

angular.module('main')
.factory('GroupFactory', ["$http", function ($http) {

  const GroupFactory = {};

  GroupFactory.createGroup = function (groupDetails) {
    return $http.post('http://localhost:1337/api/groups', groupDetails)
    .then(res => res.data);
  };

  return GroupFactory;

}]);

angular.module('main')
.factory('UserFactory', ["$firebase", function($firebase) {
  const UserFactory = {};

  UserFactory.createUser = function(userDetails) {
    return firebase.auth().createUserWithEmailAndPassword(userDetails.email, userDetails.password)
    .then(res => {
      console.log('this is the response', res);
    });
  };

  UserFactory.login = function(userDetails) {
    return firebase.auth().signInWithEmailAndPassword(userDetails.email, userDetails.password);
  };

  return UserFactory;
}]);

'use strict';

angular.module('main').controller('CreateGroupCtrl', ["$scope", "$state", "$log", "ionicTimePicker", function ($scope, $state, $log, ionicTimePicker) {

  var ipObj1 = {
    callback: function (val) {      //Mandatory
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        var selectedTime = new Date(val * 1000);
        console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
        $scope.group.expirationTime = selectedTime;
        // GroupFactory.createGroup(groupInfo)
        // .then(() => $state.go('camera'))
        // .catch($log.error);
      }
    },
    inputTime: 50400,   //Optional
    format: 12,         //Optional
    step: 15,           //Optional
    setLabel: 'Set2'    //Optional
  };


  $scope.createGroup = function(groupInfo) {
    ionicTimePicker.openTimePicker(ipObj1);


  };

}]);


'use strict';

angular.module('main').controller('JoinGroupCtrl', ["$scope", function ($scope) {

}]);


'use strict';

angular.module('main').controller('GroupLoggedInCtrl', ["$scope", function ($scope) {

}]);


'use strict';

angular.module('main').controller('GroupLoggedOutCtrl', ["$scope", "$location", function ($scope, $location) {
  $scope.goToState = function (state) {
    $state.go(state);
  };
  $scope.goLeft = function () {
  	$location.url('/tab/camera')
  }

}]);


'use strict';

angular.module('main').controller('GroupMembersCtrl', ["$scope", function ($scope) {

}]);


'use strict';

angular.module('main')
.controller('LoginCtrl', ["$scope", "$state", "$log", "Atuh", function ($scope, $state, $log, Atuh) {

  $scope.login = function(userInfo) {
    UserFactory.login(userInfo)
    .then(() => $state.go('tab.camera'))
    .catch($log.error);
  };

}]);

'use strict';

angular.module('main')
.controller('SignupCtrl', ["$scope", "$state", "$log", "UserFactory", function ($scope, $state, $log, UserFactory) {
  $scope.signUp = function(userInfo) {
    UserFactory.createUser(userInfo)
    .then(() => $state.go('tab.camera'))
    .catch($log.error);
  };
}]);


'use strict';

angular.module('main').directive('moment', function () {
  return {
    restrict: 'E',
    scope: {
      model: '='
    },
    templateUrl: 'js/common/directives/moment/moment.html'
  };
});

'use strict';

angular.module('main').controller('CameraCtrl', ["$rootScope", "$scope", "$state", "$cordovaCamera", function ($rootScope, $scope, $state, $cordovaCamera) {
  $rootScope.loggedIn = false;
  $scope.changeStatus = function () {
    $rootScope.loggedIn = !($rootScope.loggedIn);
  };

  $scope.goRight = function () {
  	if ($rootScope.loggedIn) $state.go('tab.group-logged-in');
  		else $state.go("tab.group-logged-out");
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
	        $scope.srcImage = "data:image/jpeg;base64," + imageData;
	    }, function(err) {
	        // error
	    });
	};
}]);


'use strict';

angular.module('main').controller('MapCtrl', ["$scope", "$state", "$cordovaGeolocation", function ($scope, $state, $cordovaGeolocation) {
  var options = {timeout: 10000, enableHighAccuracy: true};

  $cordovaGeolocation.getCurrentPosition(options).then(function(position){

    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var im = 'http://www.robotwoods.com/dev/misc/bluecircle.png';

    var userMarker = new google.maps.Marker({
      position: latLng,
      map: $scope.map,
      icon: im
    });

  }, function(error){
    console.log("Could not get location");
  });

}]);


'use strict';

angular.module('main').controller('MomentsCtrl', ["$rootScope", "$scope", "$state", function ($rootScope, $scope, $state) {
  $scope.greeting = 'Moments View';
  $scope.goToState = function (state) {
    $state.go(state);
  };
  $scope.moments = [{
    date: 'May 19th, 2016'
  },{
    date: 'May 31th, 2016'
  },{
    date: 'May 123, 2016'
  }];
}]);


'use-strict';

angular.module('main')
.directive('dragBack', ["$ionicGesture", "$state", function($ionicGesture, $state) {
  return {
    restrict : 'EAC',
    link : function(scope, elem, attr) {
      
      console.log("Dragback Link");
      
      $ionicGesture.on('swiperight', function(event) {
      
        console.log('Got swiped!');
        event.preventDefault();
        window.history.back();
        
      }, elem);
      
    }
  }  
}])

angular.module('main')
.factory("Auth", ["$firebaseAuth", function($firebaseAuth) {
    return $firebaseAuth();
}]);

angular.module('main')
.factory('GroupFactory', ["$http", function ($http) {

  const GroupFactory = {};

  GroupFactory.createGroup = function (groupDetails) {
    return $http.post('http://localhost:1337/api/groups', groupDetails)
    .then(res => res.data);
  };

  return GroupFactory;

}]);

angular.module('main')
.factory('UserFactory', ["$firebase", function($firebase) {
  const UserFactory = {};

  UserFactory.createUser = function(userDetails) {
    return firebase.auth().createUserWithEmailAndPassword(userDetails.email, userDetails.password)
    .then(res => {
      console.log('this is the response', res);
    });
  };

  UserFactory.login = function(userDetails) {
    return firebase.auth().signInWithEmailAndPassword(userDetails.email, userDetails.password);
  };

  return UserFactory;
}]);

'use strict';

angular.module('main').controller('CreateGroupCtrl', ["$scope", "$state", "$log", "ionicTimePicker", function ($scope, $state, $log, ionicTimePicker) {

  var ipObj1 = {
    callback: function (val) {      //Mandatory
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        var selectedTime = new Date(val * 1000);
        console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
        $scope.group.expirationTime = selectedTime;
        // GroupFactory.createGroup(groupInfo)
        // .then(() => $state.go('camera'))
        // .catch($log.error);
      }
    },
    inputTime: 50400,   //Optional
    format: 12,         //Optional
    step: 15,           //Optional
    setLabel: 'Set2'    //Optional
  };


  $scope.createGroup = function(groupInfo) {
    ionicTimePicker.openTimePicker(ipObj1);


  };

}]);


'use strict';

angular.module('main').controller('JoinGroupCtrl', ["$scope", function ($scope) {

}]);


'use strict';

angular.module('main').controller('GroupLoggedInCtrl', ["$scope", function ($scope) {

}]);


'use strict';

angular.module('main').controller('GroupLoggedOutCtrl', ["$scope", "$location", function ($scope, $location) {
  $scope.goToState = function (state) {
    $state.go(state);
  };
  $scope.goLeft = function () {
  	$location.url('/tab/camera')
  }

}]);


'use strict';

angular.module('main').controller('GroupMembersCtrl', ["$scope", function ($scope) {

}]);


'use strict';

angular.module('main')
.controller('LoginCtrl', ["$scope", "$state", "$log", "Auth", function ($scope, $state, $log, Auth) {

  $scope.login = function(userInfo) {
    UserFactory.login(userInfo)
    .then(() => $state.go('tab.camera'))
    .catch($log.error);
  };

}]);

'use strict';

angular.module('main')
.controller('SignupCtrl', ["$scope", "$state", "$log", "UserFactory", function ($scope, $state, $log, UserFactory) {
  $scope.signUp = function(userInfo) {
    UserFactory.createUser(userInfo)
    .then(() => $state.go('tab.camera'))
    .catch($log.error);
  };
}]);


'use strict';

angular.module('main').directive('moment', function () {
  return {
    restrict: 'E',
    scope: {
      model: '='
    },
    templateUrl: 'js/common/directives/moment/moment.html'
  };
});

'use strict';

angular.module('main').controller('CameraCtrl', ["$rootScope", "$scope", "$state", "$cordovaCamera", function ($rootScope, $scope, $state, $cordovaCamera) {
  $rootScope.loggedIn = false;
  $scope.changeStatus = function () {
    $rootScope.loggedIn = !($rootScope.loggedIn);
  };

  $scope.goRight = function () {
  	if ($rootScope.loggedIn) $state.go('tab.group-logged-in');
  		else $state.go("tab.group-logged-out");
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
	        $scope.srcImage = "data:image/jpeg;base64," + imageData;
	    }, function(err) {
	        // error
	    });
	};
}]);


'use strict';

angular.module('main').controller('MapCtrl', ["$scope", "$state", "$cordovaGeolocation", function ($scope, $state, $cordovaGeolocation) {
  var options = {timeout: 10000, enableHighAccuracy: true};

  $cordovaGeolocation.getCurrentPosition(options).then(function(position){

    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var im = 'http://www.robotwoods.com/dev/misc/bluecircle.png';

    var userMarker = new google.maps.Marker({
      position: latLng,
      map: $scope.map,
      icon: im
    });

  }, function(error){
    console.log("Could not get location");
  });

}]);


'use strict';

angular.module('main').controller('MomentsCtrl', ["$rootScope", "$scope", "$state", function ($rootScope, $scope, $state) {
  $scope.greeting = 'Moments View';
  $scope.goToState = function (state) {
    $state.go(state);
  };
  $scope.moments = [{
    date: 'May 19th, 2016'
  },{
    date: 'May 31th, 2016'
  },{
    date: 'May 123, 2016'
  }];
}]);


'use-strict';

angular.module('main')
.directive('dragBack', ["$ionicGesture", "$state", function($ionicGesture, $state) {
  return {
    restrict : 'EAC',
    link : function(scope, elem, attr) {
      
      console.log("Dragback Link");
      
      $ionicGesture.on('swiperight', function(event) {
      
        console.log('Got swiped!');
        event.preventDefault();
        window.history.back();
        
      }, elem);
      
    }
  }  
}])

angular.module('main')
.factory("Auth", ["$firebaseAuth", function($firebaseAuth) {
    return $firebaseAuth();
}]);

angular.module('main')
.factory('GroupFactory', ["$http", function ($http) {

  const GroupFactory = {};

  GroupFactory.createGroup = function (groupDetails) {
    return $http.post('http://localhost:1337/api/groups', groupDetails)
    .then(res => res.data);
  };

  return GroupFactory;

}]);

angular.module('main')
.factory('UserFactory', ["$firebase", function($firebase) {
  const UserFactory = {};

  UserFactory.createUser = function(userDetails) {
    return firebase.auth().createUserWithEmailAndPassword(userDetails.email, userDetails.password)
    .then(res => {
      console.log('this is the response', res);
    });
  };

  UserFactory.login = function(userDetails) {
    return firebase.auth().signInWithEmailAndPassword(userDetails.email, userDetails.password);
  };

  return UserFactory;
}]);

'use strict';

angular.module('main').controller('CreateGroupCtrl', ["$scope", "$state", "$log", "ionicTimePicker", function ($scope, $state, $log, ionicTimePicker) {

  var ipObj1 = {
    callback: function (val) {      //Mandatory
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        var selectedTime = new Date(val * 1000);
        console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
        $scope.group.expirationTime = selectedTime;
        // GroupFactory.createGroup(groupInfo)
        // .then(() => $state.go('camera'))
        // .catch($log.error);
      }
    },
    inputTime: 50400,   //Optional
    format: 12,         //Optional
    step: 15,           //Optional
    setLabel: 'Set2'    //Optional
  };


  $scope.createGroup = function(groupInfo) {
    ionicTimePicker.openTimePicker(ipObj1);


  };

}]);


'use strict';

angular.module('main').controller('JoinGroupCtrl', ["$scope", function ($scope) {

}]);


'use strict';

angular.module('main').controller('GroupLoggedInCtrl', ["$scope", function ($scope) {

}]);


'use strict';

angular.module('main').controller('GroupLoggedOutCtrl', ["$scope", "$location", function ($scope, $location) {
  $scope.goToState = function (state) {
    $state.go(state);
  };
  $scope.goLeft = function () {
  	$location.url('/tab/camera')
  }

}]);


'use strict';

angular.module('main').controller('GroupMembersCtrl', ["$scope", function ($scope) {

}]);


'use strict';

angular.module('main')
.controller('LoginCtrl', ["$scope", "$state", "$log", "Auth", function ($scope, $state, $log, Auth) {

  $scope.login = function(userInfo) {
    UserFactory.login(userInfo)
    .then(() => $state.go('tab.camera'))
    .catch($log.error);
  };

}]);

'use strict';

angular.module('main')
.controller('SignupCtrl', ["$scope", "$state", "$log", "UserFactory", function ($scope, $state, $log, UserFactory) {
  $scope.signUp = function(userInfo) {
    UserFactory.createUser(userInfo)
    .then(() => $state.go('tab.camera'))
    .catch($log.error);
  };
}]);


'use strict';

angular.module('main').directive('moment', function () {
  return {
    restrict: 'E',
    scope: {
      model: '='
    },
    templateUrl: 'js/common/directives/moment/moment.html'
  };
});

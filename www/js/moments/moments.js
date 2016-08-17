'use strict';

angular.module('main').controller('MomentsCtrl', function ($rootScope, $scope, $state, GroupFactory) {

  if(!($rootScope.loggedIn) && !($rootScope.profile.activeCode)){
    $rootScope.loggedIn = false;
    $state.go('tab.login');
  } else {
    $scope.greeting = 'Moments View';
    $scope.goToState = function (state) {
      $state.go(state);
    };

    GroupFactory.fetchMedia()
    .then(function(mediaObjects){
      $scope.mediaObjects = mediaObjects;
    })
  }

  $scope.refresh = function () {
    GroupFactory.fetchMedia()
    .then(function(mediaObjects){
      $scope.mediaObjects = mediaObjects;
    })
  }


});


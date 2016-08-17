'use strict';

angular.module('main').controller('MomentsCtrl', function ($rootScope, $scope, $state) {

  if(!($rootScope.loggedIn)){
    $rootScope.loggedIn = false;
    $state.go('tab.login');
  }

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
});


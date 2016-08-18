'use strict';

angular.module('main').controller('ProfileCtrl', ['$scope', '$state', '$rootScope', 'AuthService', 'Session', 'profile', function ($scope, $state, $rootScope, AuthService, Session, profile) {
    $scope.session = Session;

    $scope.logOut = function(){
      AuthService.logout();
      $state.go('tab.login');
    };
}]);


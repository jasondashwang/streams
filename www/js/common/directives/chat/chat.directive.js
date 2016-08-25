'use strict';

angular.module('main').directive('chat', function (MessageFactory, AuthService, $ionicScrollDelegate) {
  return {
    restrict: 'E',
    scope: {
      mediaObjects: '=',
      members: '=',
      groupCode: "="
    },
    link: function (scope, elem){
      AuthService.getLoggedInUser()
        .then(function(user){
          scope.user = user;
        })
      scope.likePost = function(id, curr) {
        MessageFactory.likePost(id, scope.groupCode, scope.user.uid, curr)
      }
    },
    templateUrl: 'js/common/directives/chat/chat.html'
  };
});

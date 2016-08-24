'use strict';

angular.module('main').directive('media', function (MessageFactory, AuthService) {
  return {
    restrict: 'E',
    scope: {
      mediaObjects: '=',
      members: '=',
      groupCode: '='
    },
    link: function(scope, elem) {
      AuthService.getLoggedInUser()
        .then(function(user){
          scope.user = user;
        })	
      scope.likePost = function(id, curr) {
        console.log('hi')
        scope.liked = !scope.liked;
        MessageFactory.likePost(id, scope.groupCode, scope.user.uid, curr)
      }
    },
    templateUrl: 'js/common/directives/media/media.html'
  };
});

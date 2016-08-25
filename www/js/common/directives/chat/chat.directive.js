'use strict';

angular.module('main').directive('chat', function (MessageFactory, AuthService) {
  return {
    restrict: 'E',
    scope: {
      mediaObjects: '=',
      members: '=',
      groupCode: "="
    },
    link: function (scope, elem){
    	scope.chatArray = [];
      AuthService.getLoggedInUser()
        .then(function(user){
          scope.user = user;
        })
    	for (var media in scope.mediaObjects) {
  			if (scope.mediaObjects[media] && scope.mediaObjects[media].mediaType && media !== '$id' && media !== '$priority') {
  				scope.mediaObjects[media].votes = Object.keys(scope.mediaObjects[media].likes).length;
  			}
    	}

      scope.likePost = function(id, curr) {
        scope.liked = !scope.liked;
        MessageFactory.likePost(id, scope.groupCode, scope.user.uid, curr)
      }

    },
    templateUrl: 'js/common/directives/chat/chat.html'
  };
});

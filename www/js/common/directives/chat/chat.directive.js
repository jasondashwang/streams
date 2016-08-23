'use strict';

angular.module('main').directive('chat', function () {
  return {
    restrict: 'E',
    scope: {
      mediaObjects: '=',
      members: '='
    },
    link: function (scope, elem){
    	scope.chatArray = [];
    	for (var media in scope.mediaObjects) {
			if (scope.mediaObjects[media] && scope.mediaObjects[media].mediaType && media !== '$id' && media !== '$priority') {
				if (scope.mediaObjects[media].mediaType !== 'message') 
					scope.mediaObjects[media].body = "Sent a " + scope.mediaObjects[media].mediaType;
				scope.chatArray.push(scope.mediaObjects[media]);
			}
    	}
    	console.log(scope.chatArray)
    },
    templateUrl: 'js/common/directives/chat/chat.html'
  };
});

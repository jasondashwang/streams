angular.module('main')
.factory('MessageFactory', function($rootScope, $q, $state, AuthService) {

  var MessageFactory = {};
  var ref = firebase.database().ref();
  MessageFactory.createNewMessage = function (message, code) {
    AuthService.getLoggedInUser()
    .then(function(user){
      message.mediaType = 'message';
      message.upvotes = 0;
      message.likes = {};
      message.member = {
        id: user.uid,
        name: user.name
      }
      message.location = null;
      ref.child('groupCollages/' + code + '/' + message.timeStamp).set(message)
      var lastMessage = {
        message: user.name + ": " + message.body,
        timeStamp: message.timeStamp

      }
      ref.child('groups/' + code + '/lastMessage').set(lastMessage)

    })

  }

  MessageFactory.likePost = function(postID, groupCode, userID, curr) {
    console.log(postID, groupCode, userID, curr)
    AuthService.getLoggedInUser()
    .then(function(user){
        ref.child('groupCollages/' + groupCode + "/" + postID + '/likes/' + userID).set(!curr);
    })

  }
  return MessageFactory;

});
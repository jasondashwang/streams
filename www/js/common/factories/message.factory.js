angular.module('main')
.factory('MessageFactory', function($rootScope, $q, $state, AuthService) {

  var MessageFactory = {};
  var ref = firebase.database().ref();
  MessageFactory.createNewMessage = function (message, code) {
    AuthService.getLoggedInUser()
    .then(function(user){
      message.mediaType = 'message';
      message.upvotes = 0;
      message.member = {
        id: user.uid,
        name: user.name
      }
      message.location = null;
      console.log(message)
      ref.child('groupCollages/' + code + '/' + message.timeStamp).set(message)
    })

  }
  return MessageFactory;

});
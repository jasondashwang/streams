angular.module('main')
.factory('UserFactory', function($firebase) {
  const UserFactory = {};

  UserFactory.createUser = function(userDetails) {
    return firebase.auth().createUserWithEmailAndPassword(userDetails.email, userDetails.password);
  };

  UserFactory.login = function(userDetails) {
    return firebase.auth().signInWithEmailAndPassword(userDetails.email, userDetails.password);
  };

  return UserFactory;
});

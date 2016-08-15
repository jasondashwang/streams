angular.module('main')
.factory('UserFactory', function($firebase) {
  const UserFactory = {};

  UserFactory.createUser = function(userDetails) {
    return firebase.auth().createUserWithEmailAndPassword(userDetails.email, userDetails.password)
    .then(res => {
      console.log('this is the response', res);
    });
  };

  UserFactory.login = function(userDetails) {
    return firebase.auth().signInWithEmailAndPassword(userDetails.email, userDetails.password);
  };

  return UserFactory;
});

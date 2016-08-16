angular.module('main')
.factory('UserFactory', function() {
  const UserFactory = {};

  const ref = firebase.database().ref("users");

  UserFactory.addUser = function(userId, name, email, phone) {
    firebase.database().ref('users/' + userId).set({
      name: name,
      email: email,
      phone: phone
    });
  };

  return UserFactory;
});

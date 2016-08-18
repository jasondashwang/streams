angular.module('main')
.factory('UserFactory', ['$q', function($q) {
  const UserFactory = {};

  const ref = firebase.database().ref();

  UserFactory.addUser = function(userId, name, email, phone, photoUrl) {

    ref.child('users/' + userId).set({
      name: name,
      email: email,
      phone: phone,
      photoUrl: photoUrl
    });
  };

  UserFactory.getUser = function(id){
    var user = $q.defer();

    ref.child('users/' + id).on('value', function(snapshot){
      user.resolve(snapshot.val());
    }, function(error){
      user.reject(error.code);
    });

    return user.promise;
  };

  return UserFactory;
}]);

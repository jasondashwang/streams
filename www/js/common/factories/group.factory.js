angular.module('main').factory('GroupFactory', ['$q', '$rootScope', 'AuthService', '$firebaseObject', '$firebaseArray', function ($q, $rootScope, AuthService, $firebaseObject, $firebaseArray) {

  var GroupFactory = {};

  var alphanumeric_unique = function () {
      return Math.random().toString(36).split('').filter( function(value, index, self) {
          return self.indexOf(value) === index;
      }).join('').substr(2,6);
  };

  var ref = firebase.database().ref();

  GroupFactory.fireBase = function(groupCode) {
    var groupRef = ref.child('groups/' + groupCode);
    return $firebaseObject(groupRef);
  };

  GroupFactory.createGroup = function (groupDetails) {

    return AuthService.getLoggedInUser()
      .then(function(user) {
        var newGroupKey = alphanumeric_unique();

        var groupPostData = {
          name: groupDetails.name,
          members: {},
          timeCreated: Date.now(),
          mediaUrl: 'http://www.digital-photography-school.com/wp-content/uploads/2011/11/square-format-03.jpg'
        };

        groupPostData.members[user.uid] = true;

        var updates = {};
        updates['groups/' + newGroupKey] = groupPostData;
        updates['users/' + user.uid + '/groups/' + newGroupKey] = true;

        return ref.update(updates);
      });
  };

  GroupFactory.joinGroup = function (groupCode) {
    return AuthService.getLoggedInUser()
      .then(function(user) {
        var updates = {};
        updates['groups/' + groupCode + '/members/' + user.uid] = false;
        updates['users/' + user.uid + '/groups/' + groupCode] = true;
        return ref.update(updates);
      });
  };

  function returnGroup(groupId) {
    var group = $q.defer()
    ref.child('groups/' + groupId).on('value', function(snapshot){
      group.resolve(snapshot.val())
    }, function(err){
      group.reject(err);
    })
    return group.promise;
  }

  GroupFactory.fetchCurrentGroups = function() {
    // two ajax calls (user + groups)
    // make sure user is 3-way binded
    return AuthService.getLoggedInUser(true)
      .then(function(user) {
        var arr = [];
        for (var code in user.groups) {
          var x = returnGroup(code);
          arr.push(x);
        }
        return $q.all(arr)
      })
      .then(function(groups){
        return groups;
      })
  };

  GroupFactory.fetchCurGroupMembers = function(groupCode) {
    return $firebaseArray(ref.child('groups/' + groupCode + '/members'));
  };

  return GroupFactory;

}]);

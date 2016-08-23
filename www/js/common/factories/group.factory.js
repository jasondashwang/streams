angular.module('main').factory('GroupFactory', ['$q', '$rootScope', 'AuthService', '$firebaseObject', '$firebaseArray', function ($q, $rootScope, AuthService, $firebaseObject, $firebaseArray) {

  var GroupFactory = {};

  var alphanumeric_unique = function () {
      return Math.random().toString(36).split('').filter(function(value, index, self) {
          return self.indexOf(value) === index;
      }).join('').substr(2,6);
  };

  var ref = firebase.database().ref();

  GroupFactory.fireBase = function(groupCode) {
    var groupRef = ref.child('groups/' + groupCode);
    return $firebaseObject(groupRef);
  };

  GroupFactory.createGroup = function (groupDetails) {

    var newGroupKey;
    return AuthService.getLoggedInUser()
      .then(function(user) {
        newGroupKey = alphanumeric_unique();
        var groupPostData = {
          name: groupDetails.name,
          members: {},
          timeCreated: Date.now(),
          mediaUrl: 'http://www.digital-photography-school.com/wp-content/uploads/2011/11/square-format-03.jpg',
          groupCode: newGroupKey,
          lastMessage: {
            message: "No posts to display",
            timeStamp: Date.now()
          }
        };

        groupPostData.members[user.uid] = true;

        var updates = {};
        updates['groups/' + newGroupKey] = groupPostData;
        updates['users/' + user.uid + '/groups/' + newGroupKey] = true;

        return ref.update(updates);
      })
      .then(function() {
        return newGroupKey;
      });
  };

  GroupFactory.joinGroup = function (groupCode) {
    var user;
    return AuthService.getLoggedInUser()
      .then(function(authUser) {
        user = authUser;
        var groupCheck = $q.defer();
        ref.child('groups/' + groupCode).on('value', function(snapshot){
          if(snapshot.val()){
            groupCheck.resolve('Success!');
          } else {
            groupCheck.reject('No group exists!');
          }
        }, function(err){
          groupCheck.reject(err);
        });

        return groupCheck.promise;
      })
      .then(function(){
        var updates = {};
        updates['groups/' + groupCode + '/members/' + user.uid] = false;
        updates['users/' + user.uid + '/groups/' + groupCode] = true;
        return ref.update(updates);
      });
  };

  GroupFactory.leaveGroup = function(groupCode) {
    return AuthService.getLoggedInUser()
      .then(function(user) {
        // delete the group from the user
        ref.child('users/' + user.uid + '/groups/' + groupCode).remove();
        // delete the member from groups
        ref.child('groups/' + groupCode + '/members/' + user.uid).remove();
      });
  };

  GroupFactory.endGroup = function(groupMembers, groupCode) {
    var groupMems = Object.keys(groupMembers);

    // remove the group from each member
    groupMems.map(function(member) {
      ref.child('users/' + member + '/groups/' + groupCode).remove();
    });

    // delete the group
    ref.child('groups/' + groupCode).remove();
  };

  return GroupFactory;

}]);

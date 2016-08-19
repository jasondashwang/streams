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

    return AuthService.getLoggedInUser()
      .then(function(user) {
        var newGroupKey = alphanumeric_unique();
        var groupPostData = {
          name: groupDetails.name,
          members: {},
          timeCreated: Date.now(),
          mediaUrl: 'http://www.digital-photography-school.com/wp-content/uploads/2011/11/square-format-03.jpg',
          groupCode: newGroupKey
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

  function returnGroup(groupId) {
    var group = $q.defer();
    ref.child('groups/' + groupId).on('value', function(snapshot){
      group.resolve(snapshot.val());
    }, function(err){
      group.reject(err);
    });
    return group.promise;
  }

  GroupFactory.fetchCurrentGroups = function() {
    // two ajax calls (user + groups)
    // make sure user is 3-way binded
    return AuthService.getLoggedInUser()
      .then(function(user) {
        var arr = [];
        for (var code in user.groups) {
          var x = returnGroup(code);
          arr.push(x);
        }
        return $q.all(arr);
      })
      .then(function(groups){
        return groups;
      });
  };

  GroupFactory.fetchMedia = function (groupId) {
    return $firebaseArray(ref.child('groupCollages/' + groupId).orderByChild("timeStamp"));
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

  GroupFactory.fetchCurGroupMembers = function(groupCode) {
    return $firebaseArray(ref.child('groups/' + groupCode + '/members'));
  };

  return GroupFactory;

}]);

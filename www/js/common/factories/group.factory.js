angular.module('main')
.factory('GroupFactory', function () {

  const GroupFactory = {};

  const user = firebase.auth().currentUser;

  const ref = firebase.database().ref();

  GroupFactory.createGroup = function (groupDetails) {
    const groupPostData = {
      name: groupDetails.name,
      members: {
        userId: user.uid,
        color: 'blue'
      }
    };

    // get a new key for the group
    const newGroupKey = ref.child('groups').push().key;

    const updates = {};
    updates[`/groups/${newGroupKey}`] = groupPostData;
    updates[`/users/${user.uid}`] = {isLeader: true, currentGroup: groupDetails.name};

    return firebase.database().ref().update(updates);
  };

  return GroupFactory;
});

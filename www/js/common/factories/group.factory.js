angular.module('main')
.factory('GroupFactory', function () {

  const GroupFactory = {};

  const user = firebase.auth().currentUser;

  const ref = firebase.database().ref();

  GroupFactory.createGroup = function (groupDetails) {
    const groupPostData = {
      name: groupDetails.name,
      members: {},
      active: true,
      groupCode: Math.floor(Math.random() * (101))
    };

    groupPostData.members[user.uid] = {color: "blue"}

    // get a new key for the group
    const newGroupKey = ref.child('groups').push().key;

    const updates = {};
    updates[`/groups/${newGroupKey}`] = groupPostData;
    updates[`/users/${user.uid}`] = {isLeader: true, currentGroup: groupDetails.name};

    return firebase.database().ref().update(updates);
  };

  GroupFactory.addMember = function (groupCode) {
    var groupRef = ref.child('groups/' + groupCode + '/members/' + user.uid);
    return groupRef.update({color: 'green'})

  }
  return GroupFactory;
});

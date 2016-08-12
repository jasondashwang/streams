angular.module('main')
.factory('GroupFactory', function ($http) {

  const GroupFactory = {};

  GroupFactory.createGroup = function (groupDetails) {
    return $http.post('/api/groups', groupDetails)
    .then(res => res.data);
  };

  return GroupFactory;

});

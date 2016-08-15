angular.module('main')
.factory('GroupFactory', function ($http) {

  const GroupFactory = {};

  GroupFactory.createGroup = function (groupDetails) {
    return $http.post('http://localhost:1337/api/groups', groupDetails)
    .then(res => res.data);
  };

  return GroupFactory;

});

'use strict';

angular.module('main').controller('GroupMembersCtrl', ['$scope', 'GroupService', '$stateParams', function ($scope, GroupService, $stateParams) {

  $scope.$on("$ionicView.loaded", function () {
    GroupService.getGroupMembers($stateParams.groupCode)
    .then(function(members){
      $scope.members = members;
    })
    .catch(function(err){
      console.err(err);
    });
  });

  // $scope.members = [
  //   {
  //     img: 'http://res.cloudinary.com/hrscywv4p/image/upload/c_fill,f_auto,g_faces:center,h_200,q_90,w_200/v1/30605/Gritty_Pretty_Miranda_Kerr_3_s1h1wf.jpg',
  //     name: 'Miranda Kerr'
  //   },
  //   {
  //     img: 'http://res.cloudinary.com/hrscywv4p/image/upload/c_fill,f_auto,g_faces:center,h_200,q_90,w_200/v1/30605/Gritty_Pretty_Miranda_Kerr_3_s1h1wf.jpg',
  //     name: 'Miranda Kerr'
  //   },
  //   {
  //     img: 'http://res.cloudinary.com/hrscywv4p/image/upload/c_fill,f_auto,g_faces:center,h_200,q_90,w_200/v1/30605/Gritty_Pretty_Miranda_Kerr_3_s1h1wf.jpg',
  //     name: 'Miranda Kerr'
  //   },
  //   {
  //     img: 'http://res.cloudinary.com/hrscywv4p/image/upload/c_fill,f_auto,g_faces:center,h_200,q_90,w_200/v1/30605/Gritty_Pretty_Miranda_Kerr_3_s1h1wf.jpg',
  //     name: 'Miranda Kerr'
  //   }
  // ];

}]);


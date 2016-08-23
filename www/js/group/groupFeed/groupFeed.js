'use strict';

angular.module('main').controller('GroupFeedCtrl',['$scope', '$stateParams', 'GroupFactory', 'MediaService', '$ionicNavBarDelegate', 'GroupService', "MessageFactory", '$ionicScrollDelegate', function ($scope, $stateParams, GroupFactory, MediaService, $ionicNavBarDelegate, GroupService, MessageFactory, $ionicScrollDelegate) {

  var unbindGroup;
  var unbindMedia;
  $scope.$on("$ionicView.enter", function () {
   // potential bug
   $scope.newMessage = {};
   $scope.chat = true;
   $scope.media = false;
   $scope.map = false;
   $scope.groupCode = $stateParams.groupCode;

   if($scope.group){
    if($scope.group.groupCode === $stateParams.groupCode) return;
    else {
      unbindGroup();
      unbindMedia();
    }
   }

    GroupService.getGroup($stateParams.groupCode)
    .then(function(group){
      return group.$bindTo($scope, 'group');
    })
    .then(function(ub){
      unbindGroup = ub;
      return GroupService.getGroupMembers($stateParams.groupCode)
    })
    .then(function(members){
      $scope.members = members;
      console.log($scope.members)

      return GroupService.getGroupCollage($stateParams.groupCode);
    })
    .then(function(groupCollage){
      return groupCollage.$bindTo($scope, 'mediaObjects');
    })
    .then(function(ub){
      unbindMedia = ub;
      var mediaArr = [];
      for (var media in $scope.mediaObjects) {
         if ($scope.mediaObjects[media] && $scope.mediaObjects[media].mediaType)
         mediaArr.push($scope.mediaObjects[media]);
      }

       MediaService.set(mediaArr);

    })
    .catch(function(err){
      console.error(err);
    });

  });

  $scope.createNewMessage = function () {
    if ($scope.newMessage.body.length < 1) {
      return;
    }
    $ionicScrollDelegate.scrollBottom()
    $scope.newMessage.timeStamp = Date.now()
    MessageFactory.createNewMessage($scope.newMessage, $scope.groupCode);   
  }


  $scope.toggleView = function(view){
    if (view == "chat") {
      $ionicScrollDelegate.scrollBottom()
      $scope.chat = true;
      $scope.media = false;
      $scope.map = false;
    } else if (view == "media") {
      $scope.chat = false;
      $scope.media = true;
      $scope.map = false;      
    } else {
      $scope.chat = false;
      $scope.media = false;
      $scope.map = true;       
    }
  }

// $scope.scrollBottom = function() {
//      $ionicScrollDelegate.scrollBottom()
//      console.log("scroll to bottom")
// }

}]);


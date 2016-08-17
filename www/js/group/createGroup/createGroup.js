'use strict';

angular.module('main').controller('CreateGroupCtrl', function ($scope, $state, $log, ionicTimePicker, GroupFactory) {

  var ipObj1 = {
    callback: function (val) {      //Mandatory
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        var selectedTime = new Date(val * 1000);
        console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
        $scope.group.expirationTime = selectedTime;
        // GroupFactory.createGroup(groupInfo)
        // .then(() => $state.go('camera'))
        // .catch($log.error);
      }
    },
    inputTime: 50400,   //Optional
    format: 12,         //Optional
    step: 15,           //Optional
    setLabel: 'Set2'    //Optional
  };


  $scope.createGroup = function(groupDetails) {
    // ionicTimePicker.openTimePicker(ipObj1);

    GroupFactory.createGroup(groupDetails)
    .then(function(){
      $state.go('tab.group-logged-in');
    })
    .catch(function(err){
      console.log(err);
    });
  };

});


angular.module('main').filter('timeFormat', function(){
 	return function(groups){
 		var now = new Date().toDateString();
 		var stamp;
 		if (!groups) return;
 		groups.forEach(function(group){
 			if (!group.lastMessage) return;
 			stamp = new Date(group.lastMessage.timeStamp)
 			if (now == stamp.toDateString()) {
 				var hours = stamp.getHours();
 				var minutes = stamp.getMinutes();
 				if (minutes < 10) minutes = '0' + minutes;
 				var period = 'am';
 				if (hours > 12) {
 					period = 'pm';
 					hours -= 12;
 				}
 				group.lastMessage.timeFormatted = hours + ":" + minutes + " " + period;
 			} else {
 				group.lastMessage.timeFormatted = stamp.toDateString();
 			}
 		})

 		return groups;
 	}


 })

angular.module('main').filter('chatTimeFormat', function(){
  return function(mediaObjects){
	var messages = [];
	for (var media in mediaObjects) {
		if (mediaObjects[media] && mediaObjects[media].mediaType)
  		messages.push(mediaObjects[media]);
  	}
    var now = new Date().toDateString();
    var stamp;
    if (!messages) return;

    messages.forEach(function(message){
      stamp = new Date(message.timeStamp)
      if (now == stamp.toDateString()) {
        var hours = stamp.getHours();
        var minutes = stamp.getMinutes();
        if (minutes < 10) minutes = '0' + minutes;
        var period = 'am';
        if (hours > 12) {
          period = 'pm';
          hours -= 12;
        }
        message.timeFormatted = hours + ":" + minutes + " " + period;
        message.upvotes = 0;
        for (var user in message.likes){
        	if (message.likes[user])
        		message.upvotes++
        }
        if(message.upvotes == 0) message.upvotes = '';
      } else {
        message.timeFormatted = stamp.toDateString();
      }
    })

    return messages;
  }


 })
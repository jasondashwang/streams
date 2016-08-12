'use-strict';

angular.module('main')
.directive('dragAnimate', ['$ionicGesture', function (ionicGesture) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var a =  attrs.dragAnimate.trim();
            var moveH = (a == '' || attrs.dragAnimate.match(/horizontal/));
            // var moveV = (a == '' || attrs.dragAnimate.match(/vertical/));

            ionicGesture.on('drag', function (event) {
                var tx = (moveH ? event.gesture.deltaX +'px' : '0');
                // var ty = (moveV ? event.gesture.deltaY +'px' : '0');
                var translate = 'translate('+ tx +','+ 0 +')';
                element.css({ 'transform': translate,
                            '-webkit-transform': translate });
            }, element);

            ionicGesture.on('dragend', function() {
                element.css({ 'transform': 'translate(0)',
                            '-webkit-transform': 'translate(0)' });
            }, element);
        }
    }
}])
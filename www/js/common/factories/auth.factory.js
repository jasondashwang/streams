angular.module('main')
.factory("Auth", function($firebaseAuth) {
    return $firebaseAuth();
});

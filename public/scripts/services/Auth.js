angular.module('AuthService', [])
  .factory('Auth', function($firebaseAuth, $firebaseArray) {
    var ref = new Firebase("https://ll2mygf.firebaseio.com/");
    return $firebaseAuth(ref);
});
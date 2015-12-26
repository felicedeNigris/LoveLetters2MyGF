angular.module('authDataService', [])
  .factory('authDataSrvc', function($firebaseAuth, $firebaseArray) {
    var ref = new Firebase("https://ll2mygf.firebaseio.com/");
    var authObj = $firebaseAuth(ref);

    return authObj.$onAuth(function(authData){
      if(authData){
        console.log("You have authData!");
      }
      else{
        console.log("You don't have authData :(");
      }
    });
});
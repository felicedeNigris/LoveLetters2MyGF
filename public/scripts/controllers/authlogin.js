app.controller('AuthController', function($scope,$rootScope, $location, Auth){


  $scope.loginGoogle = function(){
    Auth.$authWithOAuthPopup("google").then(function(authData) {
      console.log("Logged in as:", authData.google.displayName);
      console.log("Authdata is ",authData);
      location.reload();
      $location.path('/');
      $rootScope.authData = authData;
    }).catch(function(error) {
      console.error("Authentication failed:", error);
    });
  };

    $scope.loginFacebook = function(){
    Auth.$authWithOAuthPopup("facebook").then(function(authData) {
      console.log("Logged in as:", authData.facebook.displayName);
      location.reload();
      $location.path('/');
      $rootScope.authData = authData;
    }).catch(function(error) {
      console.error("Authentication failed:", error);
    });
  };


/*  $rootScope.authData = Auth.$onAuth(function(authData){
    $scope.authData = authData;
  });
*/
});
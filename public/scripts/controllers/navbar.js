app.controller('NavCtrlr',function($scope, $http, $routeParams, $location, Auth){

  $scope.signedIn = Auth.signedIn;
  $scope.currentUser = Auth.user;
  $scope.authState = function(signedIn){
    var loggedState = $scope.signedIn.$onAuth(function(authData){
      $scope.authData = authData;
      console.log("authData is "+ authData + "and also authData.uid is " + authData.uid);
    });
    return authData;
  };

  $scope.logout = function(){
    Auth.logout();
    console.log("Logged Out!");
    $location.path('/');
  };

  //Page access from pages.json
  $http.get('../../../data/pages.json').success(function(data){
    $scope.pages = data;
  });
  //Page content access from pages.json
  $http.get('../../../data/pages.json').success(function(data){
    $scope.page_content = data[$routeParams.id];
  });


});


app.controller('NavCtrlr',function($scope, $http, $routeParams, $location, Auth){

  $scope.authData = Auth.$onAuth(function(authData){
    $scope.authData = authData;
  });
  $scope.logout = function(){
    Auth.$unauth();
    location.reload();
  };

  $scope.loggedIn = Auth.$getAuth();

  //Page access from pages.json
  $http.get('../../../data/pages.json').success(function(data){
    $scope.pages = data;
  });
  //Page content access from pages.json
  $http.get('../../../data/pages.json').success(function(data){
    $scope.page_content = data[$routeParams.id];
  });

  var unauthorize = function(Auth){
    Auth.$unauth();
    $location.reload();
  };
  
});


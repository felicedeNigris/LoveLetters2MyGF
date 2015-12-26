
var app=angular.module('myBlogApp',
  [
  'ngRoute',
  'firebase',
  'angular-filepicker',//angular filepicker
  'app.directives', //navbar directive
  'footerDirective', //footer directive
  'registerDirective', //register directive
  'AuthService', //Auth service
  'authDataService',
  'FilePicker',//File Picker Service
  ])
    .constant('FBURL', "https://ll2mygf.firebaseio.com/posts") //fburl
    .config(['$routeProvider', function($routeProvider){
      
        $routeProvider.when('/',{
            templateUrl: '../views/posts.html',
            controller: 'postController'
        }).when('/post/:postId',{
            templateUrl:'../views/singlepost.html',
            controller: 'postController'
        }).when('/page/:id',{
            templateUrl:'../views/page.html',
            controller: 'NavCtrlr' //'PageController'
        }).when('/create',{
            templateUrl:'../views/createaPost.html',
            controller:'postController',
        }).when('/edit/:postId',{
            templateUrl:'../views/edit.html',
            controller:'postController'
        }).when('/register/',{
            templateUrl:'../views/Register.html',
            controller:'AuthController'
        }).when('/login/',{
            templateUrl:'../views/Login.html',
            controller:'AuthController'
        }).otherwise({
          redirectTo: '/'
        });
    }
  ]);




  



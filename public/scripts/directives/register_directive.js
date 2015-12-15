angular.module('registerDirective', [])
    .directive('registerwarning',function(Auth,$location){
      //if you are signed in and you are in the register page 
      if(Auth.signedIn() === true && location.href.slice(-10) === "/register/"){
        //you have successfully registered!
        return function(scope,element,attrs){
            $(".warning-box").css({"display":"block","top":"100%"});
            $location.path('/');
        };
      }
    });

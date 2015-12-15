angular.module('app.directives', [])
    .directive('navigationbar',function(){

        return{
            //controller: NavPagesController,

            restrict:'E',
    
            templateUrl:'../../views/navbar.html',
            replace: true
        };
    });

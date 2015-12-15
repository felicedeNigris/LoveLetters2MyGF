angular.module('FilePicker',[])
  .config(function(filepickerProvider){
    filepickerProvider.setKey('AnAvoNUfMTjmpy27C3muyz'); //Filepicker API key
  })
  .service('FilePicker', function($window){
    return $window.filepicker;
});

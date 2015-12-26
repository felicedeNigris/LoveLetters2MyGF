app.factory("Blog",["$firebaseArray","$routeParams", function($firebaseArray, $routeParams){
  
  var ref = new Firebase("https://ll2mygf.firebaseio.com/posts");// FIREBASE OBJ  
  var blogPostsArray = $firebaseArray(ref);
    return{

      id: $routeParams.postId,

      allPosts: blogPostsArray, // all fb objects

      addPost: function(newpost){
        newpost.datetime = Firebase.ServerValue.TIMESTAMP;
        return blogPostsArray.$add(newpost); //push to array
      }
    };
}]);
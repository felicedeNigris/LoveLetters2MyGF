
  app.controller('postController',["$scope","Blog","FBURL","Auth","authDataSrvc", "$firebaseObject", "$firebaseArray","FilePicker", "$window","$routeParams","$location", function($scope,Blog,FBURL,Auth,authDataSrvc,$firebaseObject,$firebaseArray,FilePicker,$window,$routeParams,$location){


    $scope.posts = Blog.allPosts; //All blog posts
    var postId = $routeParams.postId;

    if(postId){
      $scope.selectedPost = getPost(postId); // gets unique object based on its id with get post function
    }

    function getPost(postId){
      var ref = new Firebase(FBURL + "/" + postId);
      return $firebaseObject(ref);
    }


    $scope.addPost = function(newpost){
      Blog.addPost($scope.newpost);
      $location.path('/'); //redirects to home page
      console.log(newpost);
      console.log($scope.posts); // all posts
      $scope.newpost ={}; //reset the message


    };

    $scope.currentPost = function(postId){
      Blog.getPost(postId);
      console.log(postId);
    };

    $scope.editPost = function(post){
      $scope.selectedPost.$save(post);
      $location.path('/');
    };

    $scope.files = [];


    $scope.pickFile = function(){
        FilePicker.pickMultiple(
            {
              mimetype: 'image/*',
              maxFiles: 4
            },
            $scope.onSuccess
        );
    };

    $scope.onSuccess = function(Blobs,newpost){
      $scope.files.push(Blobs); //push to filepicker

      var imageURLs = []; //new image urls array
      Blobs.forEach(function(file){
        imageURLs.push(file.url); //inserts Blob.urls to imageURLs array
      });
      $scope.newpost['photo'] = imageURLs; //adds photo urls array to newpost.photo which stores to firebase 'newpost object'
      console.log(Blobs.url);
      $window.localStorage.setItem('files', JSON.stringify(Blobs.url));
    };

  // COMMENTS SECTION

      /*  {

      }*/

    $scope.createComment = function(message){

      var profilePic;
      var profileName;
      /* Check to see social media provider before pushing that information */
      if($scope.authData.provider === 'facebook'){
        profilePic = $scope.authData.facebook.profileImageURL;
        profileName = $scope.authData.facebook.displayName;
      }
      else if($scope.authData.provider === 'google'){
        profilePic = $scope.authData.google.profileImageURL;
        profileName = $scope.authData.google.displayName;
      }

      var ref = new Firebase(FBURL + "/" + postId + "/comments/");
      var fireCommentArray = $firebaseArray(ref);
      return fireCommentArray.$add(
        {
          text: $scope.message.text,
          pic: profilePic,
          name: profileName
        }
      ).then(function(ref){
        var id = ref.key();
        console.log("added comment with id " + id);
        fireCommentArray.$indexFor(id);
      }),
      $scope.message = '';
    };

    $scope.alert = function(text) {
    alert(text);
};

    //Deleting a post
    $scope.clearItem = function (id) {
        //add id of comment to ref
        var ref = new Firebase(FBURL + "/" + postId + "/comments/" + id);
        var commentObj = $firebaseObject(ref);
        // this prints the comment object and id
        console.log(commentObj);
        return commentObj.$remove(id);
    };

}]);

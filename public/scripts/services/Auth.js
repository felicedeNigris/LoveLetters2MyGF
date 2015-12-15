angular.module('AuthService', [])
  .factory('Auth', function($firebaseAuth, $firebaseArray) {

    var ref = new Firebase("https://ll2mygf.firebaseio.com/");
    var authObj = $firebaseAuth(ref);
    var authData = authObj.$getAuth(); //firebase auth data when you login 

    var Auth = {
      user: {},

      createProfile: function(authData, user) {
        var profile = {
          name: user.name,
          email: user.email,
          id: authData.uid
        };

        return $firebaseArray(ref.child('user')).$add(profile);
      },
      login: function(user) {
        return authObj.$authWithPassword({
          email: user.email,
          password: user.password
        }).then(function(authData) {
          console.log("Logged in as:", authData.uid);
          return authData; //check getAuth status
        }).then(function(authData) {
          location.reload(); // reload after login
        }).catch(function(error) {
          console.error("Authentication failed:", error);
        });
      },
      register: function(user) {
        return authObj.$createUser({
            email: user.email,
            password: user.password
          })
          .then(function(authData) {
            console.log("User " + authData.uid + " created successfully from register service!");
            return authObj.$authWithPassword({
              email: user.email,
              password: user.password,
            });
          }).then(function(authData) {
            //console.log("Logged in as:", authData.uid);
            location.reload();
            $location.path('/');
            return Auth.createProfile(authData, user);
          }).catch(function(error) {
            console.error("Error: ", error);
          });
      },
      logout: function() {
        authObj.$unauth(); //logout method
        location.reload(); //reload page
      },
      changePassword: function(user) {
        return authObj.$changePassword({
          email: user.email,
          oldPassword: user.oldpass,
          newPassword: user.newpass
        });
      },
      signedIn: function() {
        var signedin = authData === null ? false : true; //check to see if you are logged in
        console.log("signed in status is " + signedin);
        return signedin;
      }
    }; // end Auth
    if (authData) {
      console.log("Logged in as:", authData.uid);

      angular.copy(authData, Auth.user); //copy data to user{}
      //console.log("auth user ", Auth);
      console.log("Email is", Auth.user.password.email);
      //Auth.user = $firebaseArray(ref.child('user').child(authData.uid));
    }
    return Auth;
  });
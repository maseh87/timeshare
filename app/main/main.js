angular.module('timeShare', [
  'firebase',
  'ui.router'
])
.controller('MainController', function($scope){
  var ref = new Firebase("https://timeshare.firebaseio.com");
  var users = ref.child('users');
  
  $scope.fbLogin = function() {
    ref.authWithOAuthPopup("facebook", function(error, authData){
      if(error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
        users.set({
          name: authData.facebook.displayName,
          id: authData.facebook.id
        });
      };
  });
  
  ref.on('child_added', function(snapshot, prevChildKey){
    var newUser = snapshot.val()
    console.log('a new user named ' + newUser.name + ' was created');
  });
});
  

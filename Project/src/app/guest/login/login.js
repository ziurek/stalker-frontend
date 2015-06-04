angular.module( 'ngBoilerplate.guest.login', [
  'ui.router'
//  'Session'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'guest.login', {
    url: '/login',
    views: {
      "": {
        controller: 'LoginCtrl',
        templateUrl: 'guest/login/login.tpl.html'
      }
    },
    data:{ pageTitle: 'Login' }
  });
})

.controller( 'LoginCtrl', function LoginController( $scope, Session ) {
    $scope.username = "";
    $scope.password = "";
    
    console.log('session', Session);
    
    $scope.logIn = function() {
        console.log('username', $scope.username, 'password', $scope.password );
        Session.logIn({
            username: $scope.username,
            password: $scope.password
        });
    };
    
    $scope.canLogIn = function() {
        return $scope.username !== "" && $scope.password !== "";
    };
})

;


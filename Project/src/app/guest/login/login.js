angular.module( 'ngBoilerplate.guest.login', [
  'ui.router'
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

.controller( 'LoginCtrl', function LoginController( $scope, $state, Session ) {
    $scope.username = "tester";
    $scope.password = "testowe";
    
    $scope.logIn = function() {
        Session.logIn({
            login: $scope.username,
            password: $scope.password
        })
        .then( function( token ) {
            $state.go('home.map');
        });
    };
    
    $scope.canLogIn = function() {
        return $scope.username !== "" && $scope.password !== "";
    };
})

;


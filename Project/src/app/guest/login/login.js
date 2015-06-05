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
    
    $scope.login = function() {
        Session.login({
            login: $scope.username,
            password: $scope.password
        })
        .then( function( token ) {
            $state.go('home.map');
        });
    };
    
    $scope.canLogin = function() {
        return $scope.username && $scope.password;
    };
})

;


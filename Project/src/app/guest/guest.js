
angular.module( 'ngBoilerplate.guest', [
  'ui.router',
  'ngBoilerplate.guest.login'
])
.config(function config( $stateProvider ) {
  $stateProvider.state( 'guest', {
    views: {
      "main": {
        templateUrl: 'guest/guest.tpl.html'
      },
      "navbar": {
          templateUrl: 'navbar/navbar-guest.tpl.html'
      }
    },
    data:{ pageTitle: 'Guest' }
  });
});


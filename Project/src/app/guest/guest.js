
angular.module( 'ngBoilerplate.guest', [
  'ui.router',
  'ngBoilerplate.guest.login'
])
.config(function config( $stateProvider ) {
  $stateProvider.state( 'guest', {
//    url: '/home',
    views: {
      "main": {
//        controller: 'HomeCtrl',
        templateUrl: 'guest/guest.tpl.html'
      },
      "navbar": {
          templateUrl: 'navbar/navbar-guest.tpl.html'
      }
    },
    data:{ pageTitle: 'Guest' }
  });
})
;


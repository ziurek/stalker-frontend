angular.module( 'ngBoilerplate', [
  'templates-app',
  'templates-common',
  'ngBoilerplate.home',
  'ngBoilerplate.guest',
  'Session',
  'ngStorage',
  'ui.router',
  'ui.bootstrap',
  'uiGmapgoogle-maps'
])
.config(function myAppConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise( '/login' );
})
.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.headers.common['Accept'] = 'application/json';
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}])
.config( function( uiGmapGoogleMapApiProvider ) {
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.17',
        libraries: 'weather,geometry,visualization'
    });
})
.run(function( $rootScope, $state ) {
        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            if( error === "Not logged in" ) {
                $state.go('guest.login');
            }
            throw error;
        });
})
.controller('AppCtrl', function AppCtrl($scope) {
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
        if ( angular.isDefined( toState.data.pageTitle ) ) {
          $scope.pageTitle = toState.data.pageTitle + ' | StalkerWebApp' ;
        }

        $('.navbar').removeClass('navbar-map');
    });
})
.constant( 'SERVER_ADRESS', 'http://rest-stalkerweb.rhcloud.com');


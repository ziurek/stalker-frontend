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

.config( function myAppConfig ( $stateProvider, $urlRouterProvider, $locationProvider ) {
  $urlRouterProvider.otherwise( '/login' );
})

.config( function( uiGmapGoogleMapApiProvider ) {
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.17',
        libraries: 'weather,geometry,visualization'
    });
})

.run( 
    function( $rootScope ) {
        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            throw error;
        });
    }
)

.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | StalkerWebApp' ;
    }
  });
})

.constant( 'SERVER_ADRESS', 'http://rest-stalkerweb.rhcloud.com')

;


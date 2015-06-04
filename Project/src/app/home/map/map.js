angular.module('ngBoilerplate.home.map', [
    'ui.router'
])

.config(function config($stateProvider) {
    $stateProvider.state('home.map', {
        url: '/map',
        views: {
            "": {
                controller: 'MapCtrl',
                templateUrl: 'home/map/map.tpl.html'
            }
        },
        data: {pageTitle: 'Map'}
    });
})

.controller('MapCtrl', function MapController( $scope ) {
    $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
})

;


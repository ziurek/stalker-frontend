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

.controller('MapCtrl', function MapController( $scope, devicesPositionsFull ) {
    $scope.map = { center: { latitude: 52.4, longitude: 19.3 }, zoom: 6 };
    
    $('.navbar').addClass('navbar-map');
    
    $("#main-map .angular-google-map-container")
    .height($(window).height() - $('.navbar').height()-3);
    $(window).on('resize', function(){
        var win = $(this);
        $("#main-map .angular-google-map-container")
        .height(win.height() - $('.navbar').height()-3);
    });
    
    $scope.devicesPositions = devicesPositionsFull;
    
    $scope.markers = [];
    _.map( devicesPositionsFull, function( value, idx ) {
        $scope.markers.push({
            id: idx,
            latitude: value[0].latitude,
            longitude: value[0].longitude
        });
    });
})

;



angular.module('ngBoilerplate.home.map', [
    'ui.router'
])
.config(function config($stateProvider) {
    $stateProvider.state('home.map', {
        url: '/map',
        params: { scope: {} },
        views: {
            "": {
                controller: 'MapCtrl',
                templateUrl: 'home/map/map.tpl.html'
            }
        },
        data: { pageTitle: 'Map' }
    });
})
.controller('MapCtrl', function MapController(
    $scope, devicesFull, $rootScope, $interval, $state, PositionsService
) {
    function createMarkers(devices) {
        console.log('<<MARKERS UPDATED>>');
        $scope.markers = [];
        _.map(devices, function(value, idx) {
            $scope.markers.push({
                id: idx,
                latitude: value.latestPosition.latitude,
                longitude: value.latestPosition.longitude
            });
        });
        $scope.selectedDevice = devices.length && devices[0];
    }
    createMarkers(devicesFull);

    // updating markers in interval
    $interval(function () {
        PositionsService.devicesFull().then(createMarkers);
    }, 3000);

    $scope.map = { center: { latitude: 52.4, longitude: 19.3 }, zoom: 6 };

    $('.navbar').addClass('navbar-map');
    $("#main-map .angular-google-map-container")
    .height($(window).height() - $('.navbar').height()-3);
    $(window).on('resize', function(){
        var win = $(this);
        $("#main-map .angular-google-map-container")
        .height(win.height() - $('.navbar').height()-3);
    });

    $scope.window = { show: false };

    $scope.windowCloseClick = function() {
        $scope.window.show = false;
    };

    $rootScope.$on('deviceClicked', function(event, device) {
        console.log('device selected:', device);
        $scope.selectedDevice = device;
        var coords = { latitude: device.latestPosition.latitude, longitude: device.latestPosition.longitude };
        $scope.map.center = Object.create(coords);
        $scope.window.coords = Object.create(coords);
        $scope.map.zoom = 15;
        $scope.window.show = true;
    });
});

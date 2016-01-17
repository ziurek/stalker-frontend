
angular.module('ngBoilerplate.home', [
    'ui.router',
    'ngBoilerplate.home.account',
    'ngBoilerplate.home.map',
    'ngBoilerplate.home.whoIsStalkingMe',
    'ngBoilerplate.home.whoWantsToStalkMe'
])
.config(function config($stateProvider) {
    $stateProvider.state('home', {
        resolve: {
            // load it prior everything, to make sure backend works.
            Backend: function(BackendService) {
                return BackendService.promise;
            },
            devices: function(Backend, PositionsService) {
                return PositionsService.devices();
            },
            devicesFull: function(Backend, PositionsService) {
                return PositionsService.devicesFull();
            }
            //devicesPositions: function(Backend, PositionsService) {
            //    return PositionsService.devicesPositions();
            //}
            //devicesPositionsFull: function(Backend, PositionsService) {
            //    return PositionsService.devicesPositionsFull();
            //}
        },
        views: {
            "main": {
                controller: 'HomeCtrl',
                templateUrl: 'home/home.tpl.html'
            },
            "navbar": {
                controller: 'NavbarController',
                templateUrl: 'navbar/navbar-home.tpl.html'
            }
        },
        data: {pageTitle: 'Home'}
    });
})
.controller('HomeCtrl', function HomeController($scope) {})
.controller('NavbarController', function NavbarController(
        $scope, 
        $state, 
        Session, 
        devicesFull,
        $modal,
        $rootScope
    ) {
        $scope.devicesDropdown = {
            isopen: false
        };

        $scope.accountDropdown = {
            isopen: false
        };

        $scope.devices = devicesFull;
        //$scope.devicesPositions = devicesPositions;

        $scope.logout = function() {
            Session.logout()
            .then( function() {
                $state.go('guest.login');
            });
        };

        $scope.deviceClicked = function(device) {
            $rootScope.$broadcast('deviceClicked', device);
        };

        $scope.sendRequest = function() {
            var modalInstance = $modal.open({
                templateUrl: 'modals/SendRequestModal.tpl.html',
                controller: 'SendRequestModalCtrl'
            });
        };

        // centering dropdown
        var menu = $('.pull-center');
        menu.css('margin-right', menu.outerWidth() / -2);
    }
);


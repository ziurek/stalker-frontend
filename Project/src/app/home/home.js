
angular.module('ngBoilerplate.home', [
    'ui.router',
    'ngBoilerplate.home.account',
    'ngBoilerplate.home.map'
])

.config(function config($stateProvider) {
    $stateProvider.state('home', {

        resolve: {
            token: [
                'Session',
                function (
                        Session
                ) {
                    return Session.getToken()
                        .then(function (token) {
                            return token;
                        });
                }
            ],
            
            backend: [
                '$http',
                'SERVER_ADRESS',
                'token',
                function (
                    $http,
                    SERVER_ADRESS,
                    token
                ) {
                    var headers = {};
                    headers['X-Auth-Token'] = token;

                    function wrapMethod (method) {
                        return function (url, data) {
                            return $http({
                                method: method,
                                headers: JSON.parse(JSON.stringify(headers)),
                                url: SERVER_ADRESS + url,
                                data: data
                            })
                            .then(function (res) {
                                var data = res.data;
                                return data;
                            });
                        };
                    }
                    
                    return _.mapValues({
                        get: 'GET',
                        post: 'POST',
                        put: 'PUT',
                        "delete": 'DELETE'
                    }, wrapMethod);
                }
            ],
            
            devices : [
                'backend',
                function( backend ) {
                    return backend.get('/Stalker/Users')
                    .then( function( res ) {
                        return res;
                    });
                }
            ],
            
            devicesFull : [
                'backend',
                'devices',
                '$q',
                function( backend, devices, $q ) {
                    var promises = [];
                    for( var i=0; i < devices.length; i++ ) {
                        promises.push( backend.get( devices[i].href ) );
                    }
                    return $q.all( promises );
                }
            ],
            
            devicesPositions : [
                'backend',
                'devicesFull',
                '$q',
                function( backend, devices, $q ) {
                    var promises = [];
                    for( var i=0; i < devices.length; i++ ) {
                        promises.push( backend.get( devices[i].positions.href ) );
                    }
                    return $q.all( promises );
                }
            ],
            
            devicesPositionsFull : [
                'backend',
                'devicesPositions',
                '$q',
                function( backend, devices, $q ) {
                    var promises = [];
                    for( var i=0; i < devices.length; i++ ) {
                        var positions = devices[i];
                        var promisesEmbeded = [];
                        for( var j=0; j < positions.length; j++ ) {
                            promisesEmbeded.push( backend.get( positions[j].href ) );
                        }
                        promises.push( $q.all( promisesEmbeded ) );
                    }
                    return $q.all( promises );
                }
            ]
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

.controller('HomeCtrl', function HomeController($scope) {
})

.controller('NavbarController', function NavbarController(
        $scope, 
        $state, 
        Session, 
        devicesFull,
        devicesPositions,
        devicesPositionsFull
    ) {
        $scope.devicesDropdown = {
            isopen: false
        };

        $scope.accountDropdown = {
            isopen: false
        };

        $scope.devices = devicesFull;
        $scope.devicesPositions = devicesPositions;
        console.log('devicesPositions', devicesPositionsFull);

        $scope.logout = function() {
            Session.logout()
            .then( function() {
                $state.go('guest.login');
            });
        };

        // centering dropdown
        var menu = $('.pull-center');
        menu.css('margin-right', menu.outerWidth() / -2);
    }
)

;


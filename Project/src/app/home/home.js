
angular.module('ngBoilerplate.home', [
    'ui.router',
    'ngBoilerplate.home.account',
    'ngBoilerplate.home.map'
])

.config(function config($stateProvider) {
    $stateProvider.state('home', {
//        url: '/home',
        resolve: {
            connectionId: [
                'Session',
                function (
                        Session
                        ) {
                    return Session.getToken()
                            .then(function (token) {
                                return token;
                            });
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

.controller('NavbarController', function NavbarController($scope) {
    $scope.status = {
        isopen: false
    };
    
    // centering dropdown
    var menu = $('.pull-center');
    menu.css('margin-right', menu.outerWidth() / -2);
})

;


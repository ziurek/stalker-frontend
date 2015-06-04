
angular.module('ngBoilerplate.home', [
    'ui.router',
    'ngBoilerplate.home.account'
])

.config(function config($stateProvider) {
    $stateProvider.state('home', {
        url: '/home',
        views: {
            "main": {
                controller: 'HomeCtrl',
                templateUrl: 'home/home.tpl.html'
            },
            "navbar": {
                templateUrl: 'navbar/navbar-home.tpl.html'
            }
        },
        data: {pageTitle: 'Home'}
    });
})

.controller('HomeCtrl', function HomeController($scope) {
})

;


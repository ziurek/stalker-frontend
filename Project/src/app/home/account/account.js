angular.module('ngBoilerplate.home.account', [
    'ui.router'
])
.config(function config($stateProvider) {
    $stateProvider.state('home.account', {
        url: '/account',
        views: {
            "": {
                controller: 'AccountCtrl',
                templateUrl: 'home/account/account.tpl.html'
            }
        },
        data: { pageTitle: 'Account' }
    });
})
.controller('AccountCtrl', function ($scope, UserService) {
    $scope.saveProfile = function(model) {
        UserService.save(model)
        .then(function(response) {
            alertify.success(response);
        });
    };
});


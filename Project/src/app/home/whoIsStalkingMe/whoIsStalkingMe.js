angular.module('ngBoilerplate.home.whoIsStalkingMe', [
    'ui.router'
])
.config(function config($stateProvider) {
    $stateProvider.state('home.whoIsStalkingMe', {
        url: '/whoIsStalkingMe',
        views: {
            "": {
                controller: 'WhoIsStalkingMeCtrl',
                templateUrl: 'home/whoIsStalkingMe/whoIsStalkingMe.tpl.html'
            }
        },
        resolve: {
            stalkingList: function(RequestService) {
                return RequestService.getStalking();
            }
        },
        data: {pageTitle: 'Who is stalking me?'}
    });
})
.controller('WhoIsStalkingMeCtrl', function ($scope, RequestService, stalkingList, $state) {
    $scope.stalkingList = stalkingList;

    $scope.remove = function(user) {
        alertify.confirm(
            "Are you sure, you want to disable stalking of you by this user?",
            function(ok) {
                if(ok) {
                    console.log('ok', user);
                    RequestService.disableStalking(user).then(function(list) {
                        $scope.stalkingList = list;
                        //$state.go($state.current, {}, {reload: true});
                    });
                }
            }
        );
    };
});


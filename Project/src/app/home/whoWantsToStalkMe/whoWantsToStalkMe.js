angular.module('ngBoilerplate.home.whoWantsToStalkMe', [
    'ui.router'
])
.config(function config($stateProvider) {
    $stateProvider.state('home.whoWantsToStalkMe', {
        url: '/whoWantsToStalkMe',
        views: {
            "": {
                controller: 'WhoWantsToStalkMeCtrl',
                templateUrl: 'home/whoWantsToStalkMe/whoWantsToStalkMe.tpl.html'
            }
        },
        resolve: {
            stalkingList: function(RequestService) {
                return RequestService.getStalkingRequests();
            }
        },
        data: {pageTitle: 'Who wants to stalk me?'}
    });
})
.controller('WhoWantsToStalkMeCtrl', function ($scope, RequestService, stalkingList) {
    $scope.stalkingList = stalkingList;

    $scope.approve = function(user) {
        alertify.confirm(
            "Are you sure, you want to approve stalking of you by this user?",
            function(ok) {
                if(ok) {
                    console.log('ok', user);
                    RequestService.enableStalking(user).then(function(list) {
                        $scope.stalkingList = list;
                    });
                }
            }
        );
    };

    $scope.decline = function(user) {
        alertify.confirm(
            "Are you sure, you want to decline stalking of you by this user?",
            function(ok) {
                if(ok) {
                    console.log('ok', user);
                    RequestService.disableStalking(user).then(function(list) {
                        $scope.stalkingList = list;
                    });
                }
            }
        );
    };
});


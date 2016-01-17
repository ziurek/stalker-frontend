
angular.module('ngBoilerplate')
.controller('SendRequestModalCtrl', function ($scope, $modalInstance, RequestService) {
    $scope.model = {};

    $scope.sendReq = function(model) {
        RequestService.send(model)
        .then(function(response) {
            alertify.success(response);
            $modalInstance.close(response);
        },
        function(err) {
            alertify.error(err);
        });
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
});

angular.module( 'ngBoilerplate')
.factory('BackendService',
    function (
        $http,
        SERVER_ADRESS,
        TokenService
    ) {
    var headers = {};
    var token = '';
    var promise = TokenService.then(function(tkn) {
        token = tkn;
        headers['X-Auth-Token'] = token;
    });

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

    return _.merge(
        _.mapValues({
            get: 'GET',
            post: 'POST',
            put: 'PUT',
            "delete": 'DELETE'
        }, wrapMethod),
        {
            promise: promise
        }
    );
});
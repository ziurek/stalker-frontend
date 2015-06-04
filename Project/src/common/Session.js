angular.module( 'Session', [] )

.factory('Session', [
    '$http',
    '$q',
    '$sessionStorage',
    'SERVER_ADRESS',

    function (
        $http,
        $q,
        $sessionStorage,
        SERVER_ADRESS
    ) {
        var authService = {};
        var token = null;

        function updateToken (newToken) {
            token = newToken;
            $sessionStorage.token = token;
            return token;
        }

        authService.logIn = function (credentials) {
            return $http
            .post(SERVER_ADRESS + '/Stalker/Login', credentials)
            .then(function (res) {
//                if (res.data.state === 1) {
//                    return $q.reject(res.data.err);
//                }
                console.log('Session login response', res);
                return res;
//                return updateConnectionId(res.data.connectionId);
            });
        };
        
        return authService;
    }
])

;
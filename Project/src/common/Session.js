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
                return updateToken(res.data.token);
            });
        };
        
        authService.getToken = function() {
            var d = $q.defer();

            if (!token) {
                token = $sessionStorage.token;
            }

            if (token) {
                d.resolve(token);
            } else {
                d.reject('Not logged in');
            }

            return d.promise;
        };
        
        return authService;
    }
])

;
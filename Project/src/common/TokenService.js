
angular.module( 'ngBoilerplate')
.factory('TokenService', function(Session) {
    return Session.getToken()
    .then(function (token) {
        return token;
    });
});
angular.module( 'ngBoilerplate')
.factory('UserService', function(BackendService, $q) {
    return {
        save: function(user) {
            var d = $q.defer();
            d.resolve('Changes saved!');
            return d.promise;
        }
    };
});
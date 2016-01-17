
angular.module( 'ngBoilerplate')
.factory('RequestService', function(BackendService, $q) {
    return {
        send: function(model) {
            //return BackendService.get('/Stalker/Requests', model);
            var d = $q.defer();
            d.resolve('Reqest was sent!');
            return d.promise;
        },
        getStalking: function() {
            var d = $q.defer();
            d.resolve([
                {
                    _id: 242,
                    username: 'tester2',
                    name: 'Piotr Kovelsky'
                },
                {
                    _id: 11,
                    username: 'tester3',
                    name: 'Maciej Burnejko'
                }
            ]);
            return d.promise;
        },
        getStalkingRequests: function() {
            var d = $q.defer();
            d.resolve([
                {
                    _id: 242,
                    username: 'tester24',
                    name: 'Piotr Kovelsky'
                },
                {
                    _id: 11,
                    username: 'tester32',
                    name: 'Maciej Burnejko'
                },
                {
                    _id: 1241,
                    username: 'tester3',
                    name: 'Patryk Burnejko'
                }
            ]);
            return d.promise;
        },
        enableStalking: function(user) {
            var d = $q.defer();
            d.resolve([
                {
                    _id: 242,
                    username: 'tester24',
                    name: 'Piotr Kovelsky'
                },
                {
                    _id: 11,
                    username: 'tester32',
                    name: 'Maciej Burnejko'
                }
            ]);
            return d.promise;
        },
        disableStalking: function(user) {
            var d = $q.defer();
            d.resolve([
                {
                    _id: 242,
                    username: 'tester24',
                    name: 'Piotr Kovelsky'
                },
                {
                    _id: 11,
                    username: 'tester32',
                    name: 'Maciej Burnejko'
                }
            ]);
            return d.promise;
        }
    };
});
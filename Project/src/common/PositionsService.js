angular.module( 'ngBoilerplate')
.factory('PositionsService', function(BackendService, $q) {
    return {
        devices: function() {
            return BackendService.get('/Stalker/Users')
            .then(function (res) {
                return res;
            });
        },
        devicesFull: function() {
            return this.devices().then(function(devices) {
                var promises = [];
                for( var i=0; i < devices.length; i++ ) {
                    promises.push( BackendService.get( devices[i].href ) );
                }
                return $q.all( promises );
            });
        },
        devicesPositions: function() {
            return this.devicesFull().then(function(devices) {
                var promises = [];
                for (var i = 0; i < devices.length; i++) {
                    promises.push(BackendService.get(devices[i].positions.href));
                }
                return $q.all(promises);
            });
        },
        devicesPositionsFull: function() {
            return this.devicesPositions().then(function(devices) {
                var promises = [];
                for (var i = 0; i < devices.length; i++) {
                    var positions = devices[i];
                    var promisesEmbeded = [];
                    for (var j = 0; j < positions.length; j++) {
                        promisesEmbeded.push(BackendService.get(positions[j].href));
                    }
                    promises.push($q.all(promisesEmbeded));
                }
                return $q.all(promises);
            });
        }
    };
});
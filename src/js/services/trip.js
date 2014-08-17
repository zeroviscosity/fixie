(function(window, angular) {
    'use strict';

    var app = angular.module('app');

    app.factory('trip', ['$window', '$resource', function($window, $resource) {
        var Location = $resource('/api/maps/location'),
            service = {
                purpose: null,
                location: {
                    start: '220 King Street West, Toronto, ON, Canada',
                    end: null
                }
            },
            geolocation = (function(n) {
                return (n && n.geolocation) ? n.geolocation : null;
            })($window.navigator);

        if (geolocation) {
            geolocation.getCurrentPosition(function(pos) {
                Location.get({ 
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude
                }, function(resp) {
                    console.log(resp);
                    if (resp.results && resp.results.length) {
                        service.location.start = resp.results[0].formatted_address;
                    }
                });
            });
        }

        return service;
    }]);
})(window, window.angular);

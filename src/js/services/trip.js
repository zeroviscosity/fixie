(function(window, angular) {
    'use strict';

    var app = angular.module('app');

    app.factory('trip', [function() {
        var service = {
            purpose: null,
            start: null,
            end: null,
            geolocation: (funciton(n) {
                return (n && n.geolocation) ? n.geolocaiton : null;
            })($window.navigator)
        };

        return service;
    }]);
})(window, window.angular);

(function(window, angular) {
    'use strict';
    
    var app = angular.module('app');

    app.controller('PointsCtrl', function($window, trip) { 
        var autocomplete = {
                start: null,
                end: null
            },
            start = $window.document.getElementById('location-start'),
            end = $window.document.getElementById('location-end');
        console.log(trip);
        autocomplete.start = new $window.google.maps.places.Autocomplete(start);
        autocomplete.end = new $window.google.maps.places.Autocomplete(end);

        this.trip = trip;
        setTimeout(function() { console.log(trip); }, 1000);
    }); 
})(window, window.angular);

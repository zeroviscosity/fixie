(function(window, angular) {
    'use strict';
    
    var app = angular.module('app');

    app.controller('DetailsCtrl', function($window, trip) { 
        var autocomplete = {
                start: null,
                end: null
            },
            start = $window.document.getElementById('location-start'),
            end = $window.document.getElementById('location-end');
        
        autocomplete.start = new $window.google.maps.places.Autocomplete(start);
        autocomplete.end = new $window.google.maps.places.Autocomplete(end);

        this.trip = trip;
        this.go = function() {
            trip.location.start = start.value;
            trip.location.end = end.value;
            console.log(trip);
        };
        this.checkSpecificity = function() {
            if (trip.arrival.specificity === 'approximate') {
                trip.arrival.minute = '00';
            }
        };
    }); 
})(window, window.angular);

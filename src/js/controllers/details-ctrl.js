(function(window, angular) {
    'use strict';
    
    var app = angular.module('app');

    app.controller('DetailsCtrl', function($window, $location, trip) { 
        var autocomplete = {
                start: null,
                end: null
            },
            start = $window.document.getElementById('location-start'),
            end = $window.document.getElementById('location-end'); 
        
        autocomplete.start = new $window.google.maps.places.Autocomplete(start);
        autocomplete.end = new $window.google.maps.places.Autocomplete(end);
         
        this.trip = trip;
        this.blurred = {
            start: !!trip.location.start.address,
            end: !!trip.location.end.address
        };
        this.go = function() {
            trip.location.start.address = start.value;
            trip.location.start.latitude = autocomplete.start.getPlace().geometry.location.lat();
            trip.location.start.longitude = autocomplete.start.getPlace().geometry.location.lng();
            trip.location.end.address = end.value;
            trip.location.end.latitude = autocomplete.end.getPlace().geometry.location.lat();
            trip.location.end.longitude = autocomplete.end.getPlace().geometry.location.lng();
            $location.path('/results');
        };
        this.checkSpecificity = function() {
            if (trip.arrival.specificity === 'approximate') {
                trip.arrival.minute = '00';
            }
        };
    }); 
})(window, window.angular);

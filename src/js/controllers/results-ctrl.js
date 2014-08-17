(function(window, angular) {
    'use strict';
    
    var app = angular.module('app');

    app.controller('ResultsCtrl', function($scope, $timeout, $location, trip) {
        if (!trip.location.start.address || !trip.location.end.address) {
            $location.path('/purpose');
            return;
        }
        
        this.trip = trip;          
        
        angular.element('#map-driving').html('');
        angular.element('#map-transit').html('');
        angular.element('#map-bicycling').html('');
        
        trip.calculate();

        $scope.$on('calculationComplete', function() {
            if (!trip.finished()) {
                return;
            }
            $timeout(function() {
                _.each(['driving', 'transit', 'bicycling'], function(mode) {
                    var el,
                        mapMode = (mode === 'transit' && !trip.plans[mode].time) ? 
                            'walking' : mode;

                    el = '<iframe frameborder="0" seamless src="https://www.google.com/maps/embed/v1/directions' +
                        '?key=' + trip.maps.key + 
                        '&mode=' + mapMode +
                        '&origin=' + trip.location.start.address +
                        '&destination=' + trip.location.end.address +
                        '&waypoints=';
                    el += _.map(trip.plans[mode].waypoints, function(wp) {
                        return wp.lat + ',' + wp.lng; 
                    }).join('|');
                    el += '"></iframe>';
                    angular.element('#map-' + mode).html(el);
                });
            }, 1000);
        });
    }); 
})(window, window.angular);

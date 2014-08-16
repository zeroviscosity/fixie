(function(window, angular) {
    'use strict';
    
    var app = angular.module('app');

    app.controller('PointsCtrl', function(trip) { 
        var self = this;        

        self.start = '';
        self.end = '';

        self.go = function() {
            trip.start = self.start;
            trip.end = self.end;
        };
    }); 
})(window, window.angular);

(function(window, angular) {
    'use strict';
    
    var app = angular.module('app');

    app.controller('PurposeCtrl', function($location, trip) {
        this.set = function(purpose) {
            trip.purpose = purpose;
            $location.path('/points');
        };
    }); 
})(window, window.angular);

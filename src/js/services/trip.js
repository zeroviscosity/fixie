(function(window, angular) {
    'use strict';

    var app = angular.module('app');

    app.factory('trip', [function() {
        var service = {
            purpose: null,
            start: null,
            end: null  
        };

        return service;
    }]);
})(window, window.angular);

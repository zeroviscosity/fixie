(function(window, angular) {
    'use strict';

    var app = angular.module('app', ['ngAnimate', 'ngResource', 'ngRoute', 'ngTouch']);
    
    app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider.when('/purpose', {
            templateUrl: '/templates/purpose.html'
        }).when('/sample', {
            templateUrl: '/templates/sample.html'
        }).when('/points', {
            templateUrl: '/templates/points.html'
        }).otherwise({
            redirectTo: '/purpose'
        });

        $locationProvider.html5Mode(true).hashPrefix('!');
    }]);
})(window, window.angular);

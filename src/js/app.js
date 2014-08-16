(function(window, angular) {
    'use strict';

    var app = angular.module('app', ['ngRoute', 'ngTouch']);
    
    app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider.when('/search', {
            templateUrl: '/templates/search.html'
        }).otherwise({
            redirectTo: '/search'
        });

        $locationProvider.html5Mode(true).hashPrefix('!');
    }]);
})(window, window.angular);

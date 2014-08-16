(function(window, angular) {
    'use strict';

    var app = angular.module('app');

    app.directive('fxArrow', function() {
        return {
            scope: {
                direction: '@'
            },
            controller: ['$scope', '$window', '$element', function($scope, $window, $element) {
                $element.on('click', function() {
                    if ($scope.direction === 'forward') $window.history.forward();
                    else $window.history.back();
                });
            }],
            template: '<div class="fx-arrow" data-ng-class="direction"></div>'
        };
    });
})(window, window.angular);

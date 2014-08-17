(function(window, angular) {
    'use strict';

    var app = angular.module('app');

    app.factory('trip', ['$rootScope', '$window', '$resource', function($rootScope, $window, $resource) {
        var Location = $resource('/api/maps/location'),
            Trip = $resource('/api/trip', null, {
                plan: { method: 'GET', url: '/api/trip/:mode' }
            }),
            service = {
                maps: {
                    key: angular.element('#maps-key').text()
                },
                purpose: null,
                location: {
                    start: {
                        address: '',
                        latitude: 43.6472849,
                        longitude: -79.38707569999997 
                    },
                    end: {
                        address: '',
                        latitude: 43.6472849,
                        longitude: -79.38707569999997 
                    }
                },
                arrival: {
                    specificity: 'none',
                    hour: '12',
                    minute: '00',
                    ampm: 'pm' 
                },
                plans: {
                    'bicycling-share': {},
                    'bicycling-own': {},
                    'driving': {},
                    'transit': {}
                },
                calculating: {
                    'bicycling-share': true,
                    'bicycling-own': true,
                    'driving': true,
                    'transit': true
                }
            },
            geolocation = (function(n) {
                return (n && n.geolocation) ? n.geolocation : null;
            })($window.navigator);

        if (geolocation) {
            geolocation.getCurrentPosition(function(pos) {
                Location.get({ 
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude
                }, function(resp) {
                    console.log(resp);
                    if (resp.results && resp.results.length) {
                        service.location.start = resp.results[0].formatted_address;
                    }
                });
            });
        }

        service.getTime = function(mode) {
            var time, h, m;
            
            if (!service.plans[mode].time) {
                return "N/A";
            }
            time = _.parseInt(service.plans[mode].time);
            if (time > 60) {
                h = Math.floor(time / 60);
                m = Math.floor(time % 60);
            } else {
                h = '';
                m = Math.floor(time);
            }
            return ((h) ? h + 'h ' : '') + m + 'm';
        };

        service.getTimestamp = function() {
            var d = new Date(),
                h = _.parseInt(service.arrival.hour);
            
            if (service.arrival.ampm === 'am' && h === 12) {
                h = 0;
            } else if (service.arrival.ampm === 'pm' && h !== 12) {
                h += 12;
            }

            d.setHours(h);
            d.setMinutes(_.parseInt(service.arrival.minute));
            d.setSeconds(0);

            return d.getTime();
        };

        service.finished = function() {
            return !(service.calculating['bicycling-own'] || 
                service.calculating['bicycling-share'] ||
                service.calculating.transit);
        };

        service.calculate = function() {
            // driving|transit|walk|bike_share|bike_owner
            var baseData = {
                start_lat: service.location.start.latitude,
                start_lng: service.location.start.longitude,
                end_lat: service.location.end.latitude,
                end_lng: service.location.end.longitude,
                arrive_by: service.getTimestamp()
            };

            service.calculating['bicycling-own'] = true;
            service.calculating['bicycling-share'] = true;
            service.calculating.transit = true;

            _.each(['bicycling-own', 'bicycling-share', 'transit'], function(mode) {
                var data = _.clone(baseData);

                if (mode === 'bicycling-share') {
                    data.mode = 'bike_share';  
                } else if (mode === 'bicycling-own') {
                    data.mode = 'bike_owner';  
                } else {
                    data.mode = mode;
                }

                service.plans[mode] = Trip.plan(data, function(resp) {
                    console.log(mode, resp);
                    service.calculating[mode] = false;
                    $rootScope.$broadcast('calculationComplete');
                });
            });
        };

        return service;
    }]);
})(window, window.angular);

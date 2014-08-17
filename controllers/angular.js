var _ = require('lodash'),
    key = process.env.GOOGLE_MAPS_API_KEY,
    angular = {};

angular.app = function(req, res) {
    res.render('app', {
        maps: {
            key: key
        }
    });
};

angular.template = function(req, res) {
    var data = {};
    if (req.params.template === 'details') {
        data.hours = _.range(1, 13);
        data.minutes = _.map(_.range(0, 60), function(i) {
            return (i < 10) ? '0' + i : i.toString();
        });
    }
    res.render('templates/' + req.params.template, data);
};

module.exports = angular;

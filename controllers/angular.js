var _ = require('lodash'),
    angular = {};

angular.app = function(req, res) {
    res.render('app');
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

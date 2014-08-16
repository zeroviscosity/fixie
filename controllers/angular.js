var angular = {};

angular.app = function(req, res) {
    res.render('app');
};

angular.template = function(req, res) {
    res.render('templates/' + req.params.template);
};

module.exports = angular;

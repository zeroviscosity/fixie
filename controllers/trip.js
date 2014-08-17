var request = require('request'),
    trip = {},
    baseUrl = 'http://bike.crowdriff.com:5001/d/';

trip.plan = function(req, res) {
    var url = baseUrl + req.params.mode + 
        '?start_lat=' + req.query.start_lat +
        '&start_lng=' + req.query.start_lng +
        '&end_lat=' + req.query.end_lat +
        '&end_lng=' + req.query.end_lng +
        '&arrive_by=' + req.query.arrive_by;
    console.log(url);
    request.get(url, function(err, resp, body) {
        var results;
        try {
            results = JSON.parse(body);
        } catch(e) {
            console.error(e);
            results = {};
        }
        res.json(results);
    }); 
};

module.exports = trip;

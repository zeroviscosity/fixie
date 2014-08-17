var request = require('request'),
    key = process.env.GOOGLE_MAPS_API_KEY,
    maps = {};

maps.location = function(req, res) {
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
            req.query.latitude +
            ',' +
            req.query.longitude;
    
    request.get(url, function(err, resp, body) {
        var loc;
        try {
            loc = JSON.parse(body);
        } catch(e) {
            loc = {};
        }
        res.json(loc);
    });
};

module.exports = maps;

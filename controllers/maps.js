var request = require('request'),
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
            console.error(e);
            loc = {};
        }
        res.json(loc);
    });
};

module.exports = maps;

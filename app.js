var express = require('express'),
    logger = require('morgan'),
    angular = require('./controllers/angular'),
    maps = require('./controllers/maps'),
    trip = require('./controllers/trip'),
    app = express(),
    port = process.env.NODE_PORT || 3000,
    env = process.env.NODE_ENV || 'development';

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.enable('verbose errors');

if (env === 'development') {
    app.use(logger('dev'));
    app.locals.pretty = true;
} else if (env === 'production') {
    app.disable('verbose errors');
}

app.get('/', angular.app);
app.get('/purpose', angular.app);
app.get('/details', angular.app);
app.get('/results', angular.app);
app.get('/templates/:template.html', angular.template);
app.get('/api/maps/location', maps.location);
app.get('/api/trip/:mode', trip.plan);

app.listen(port, function() {
    console.log('Listening on port', port);
});


var express = require('express'),
    logger = require('morgan'),
    angular = require('./controllers/angular'),
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
app.get('/points', angular.app);
app.get('/purpose', angular.app);
app.get('/templates/:template.html', angular.template);

app.listen(port, function() {
    console.log('Listening on port', port);
});


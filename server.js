var express = require('express'),
    path = require('path'),
    exphbs = require('express-handlebars'),
    port = process.env.PORT || 4000;
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');

var app = express();

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// set static, public stuff assesible to the browser
app.use(express.static(path.join(__dirname + '/public')));

app.use('/', routes);

app.listen(port);
console.log('CSP API server started on:' + port);

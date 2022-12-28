var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var swaggerUi = require('swagger-ui-express')
var swaggerFile = require('./swagger_output.json')

var swaggerOptions = {
    explorer: true,
    swaggerOptions: {
        validatorUrl: null
    }
}

var router = require('./modules/routes')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'logs')));

var blackList = [];

var corsOptionsDelegate = (req, callback) => {
    var corsOptions
    if (blackList.indexOf(req.header('Origin')) !== -1)
        corsOptions = { origin: false }
    else
        corsOptions = { origin: true }

    callback(null, corsOptions)
}


app.use(cors(corsOptionsDelegate));
app.options('*', cors(corsOptionsDelegate));


app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile, swaggerOptions))
app.use('/api', router)

module.exports = app;

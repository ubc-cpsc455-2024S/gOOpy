var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const MongoStore = require('connect-mongo');

dotenv.config();
require('./db');

var logger = require('morgan');
const cors = require('cors');

var sceneRouter = require('./routes/scene');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');

var app = express();

app.set('trust proxy', 1);


app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_CONNECTION_STRING,
        }),
        cookie: {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 48,
            sameSite: 'none',
        },
    })
);

app.use(
    cors({
        origin: process.env.WEBSITE_URL,
        credentials: true,
    })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/scene', sceneRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: req.app.get('env') === 'development' ? err : {},
    });
});

module.exports = app;

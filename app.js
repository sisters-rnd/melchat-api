'use strict';

const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const indexRouter = require('./routes/api/index');

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(res.status(404).send());
});

module.exports = app;

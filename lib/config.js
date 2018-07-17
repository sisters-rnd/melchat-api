'use strict';

const rc = require('rc');

let config = rc('melchat-api', {
    db: {
        host: undefined,
        port: undefined,
        database: undefined,
        user: undefined,
        password: undefined
    }
});

module.exports = config;
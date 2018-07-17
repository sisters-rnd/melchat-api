'use strict';

const express = require('express');
const router = express.Router();

/* GET chats listing. */
router.get('/', function(req, res, next) {
    res.send('respond to chats api');
});

module.exports = router;

'use strict';

const version  = require( '../../package.json').version;
const Router = require('express').Router;
const chats = require('./chats');

let router = Router();

router.use('/chats', chats);

// API metadata at the root
router.get('/', (req, res) => {
    res.json({ version });
});

module.exports = router;

'use strict';

const express = require('express');
const router = express.Router();
const logger = require('modules/logger');

router.get('/', (req, res, next) => {
    res.json(req.locals.data);
});

module.exports = router;
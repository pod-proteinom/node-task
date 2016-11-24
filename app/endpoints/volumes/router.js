'use strict';

const express = require('express');
const router = express.Router();
const logger = require('modules/logger');
const _ = require('lodash');

router.get('/volumes', (req, res, next) => {
    const HDD_KEY = 'hdd';
    const data = req.locals.data;
    const hdds = data[HDD_KEY];

    let volumes = {};
    hdds.forEach(hdd => {
        if (!volumes[hdd.volume]) {
            volumes[hdd.volume] = 0;
        }
        volumes[hdd.volume] += hdd.size;
    });
    const result = _.mapValues(volumes, size => size + 'B');
    res.json(result);
});

module.exports = router;
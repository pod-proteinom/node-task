'use strict';

const express = require('express');
const router = express.Router();
const logger = require('modules/logger');

router.param('first', (req, res, next, first) => {
    const data = req.locals.data;
    if (!data.propertyIsEnumerable(first)) {
        return next('Not Found');
    }
    req.locals.first = data[first];
    return next();
});

router.get('/:first', (req, res, next) => {
    res.json(req.locals.first);
});

router.param('second', (req, res, next, second) => {
    const data = req.locals.first;
    if (!data.propertyIsEnumerable(second)) {
        return next('Not Found');
    }
    req.locals.second = data[second];
    return next();
});

router.get('/:first/:second', (req, res, next) => {
    res.json(req.locals.second);
});

router.param('third', (req, res, next, third) => {
    const data = req.locals.second;
    if (!data.propertyIsEnumerable(third)) {
        return next('Not Found');
    }
    req.locals.third = data[third];
    return next();
});

router.get('/:first/:second/:third', (req, res, next) => {
    res.json(req.locals.third);
});

module.exports = router;
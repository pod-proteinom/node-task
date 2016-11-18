'use strict';

const conf = require('config');
const logger = require('modules/logger');
const Promise = require('bluebird');

const readFile = Promise.promisify(require('fs').readFile);
const getData = (req, res, next) => {
    readFile(conf.data.path, 'utf8').then(data => {
    		req.locals = {};
            req.locals.data = JSON.parse(data);
        })
        .catch(err => {
            // logger.err('Couldn\'t read data');
        }).then(next);
}
module.exports = getData;

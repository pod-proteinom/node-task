'use strict';

const conf = require('config');
const logger = require('modules/logger');
const fetch = require('node-fetch');
const Promise = require('bluebird');

const writeFile = Promise.promisify(require('fs').writeFile);

const loadData = fetch(conf.data.url).then(res => {
    return res.json();
}).catch(err => {
    logger.err('Couldn\'t load data');
}).then(json => {
	logger.debug('Data loaded successfully');
	return writeFile(conf.data.path, JSON.stringify(json), 'utf8').catch(err => {
    	logger.err('Couldn\'t write data');
	});
}).then(() => {
	logger.debug('Data wrote successfully');
});

module.exports = loadData;
'use strict';

const conf = require('config');
const winston = require('winston');

const logger = new winston.Logger({
	transports: [
		new winston.transports.Console(conf.logger)
	]
});

module.exports = logger;
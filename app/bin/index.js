'use strict';

const conf = require('config');
const logger = require('modules/logger');

const app = require('modules/app');

const server = app.listen(conf.server.port, (err) => {
	if(err) {
		throw err;
	}
	logger.info(`Server is running on port ${conf.server.port}`); 
});

module.exports = server;
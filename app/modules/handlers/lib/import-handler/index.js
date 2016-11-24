'use strict';

module.exports = (handlerName, app) => {
	const handler = require(handlerName);
	if(handler.init) {
		handler.init(app);
	}
	if(handler.router) {
		app.use('/', handler.router);
	}
};
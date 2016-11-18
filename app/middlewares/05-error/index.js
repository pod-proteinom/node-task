'use strict';

const logger = require('modules/logger');

exports.init = (app) => {
    app.use((err, req, res, next) => {
        if (err === 'Not Found') {
            return next();
        }

        logger.err(err);
        res.status(500);
        res.send(err);
    });

    app.use((req, res) => {
    	res.status(404);
    	res.send('Not Found');
    })
};

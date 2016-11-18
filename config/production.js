'use strict';
const path = require('path');
const join = path.join;
const dirname = path.dirname;
const rootDirectory = dirname(__dirname);
const pathToData = join(rootDirectory, 'data', 'data.json');

module.exports = {
	data: {
		url: 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json',
		path: pathToData
	},
    server: {
        port: 4000
    },
    logger: {
        level: 'err',
		colorize: true
    }
}

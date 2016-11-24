'use strict';
const path = require('path');
const join = path.join;
const dirname = path.dirname;
const rootDirectory = dirname(__dirname);
const pathToData = join(rootDirectory, 'data', 'data.json');

module.exports = {
	data: {
		url: 'https://gist.githubusercontent.com/isuvorov/55f38b82ce263836dadc0503845db4da/raw/pets.json',
		path: pathToData
	},
    server: {
        port: 4000
    },
    logger: {
        level: 'debug',
		colorize: true
    }
}

'use strict';
const conf = require('config');
const join = require('path').join;

const middlewares = [
	'middlewares/00-log-req',
	'middlewares/01-cors'
];

const endpoints = [
	'endpoints/frontpage'
];

const handlers = middlewares.concat(endpoints);

exports.importHandler = require('./lib/import-handler');

exports.handlers = handlers;
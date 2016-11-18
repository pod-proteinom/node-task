'use strict';
const conf = require('config');
const join = require('path').join;

const middlewares = [
	'middlewares/00-log-req',
	'middlewares/01-cors',
	'middlewares/02-set-data'
];

const endpoints = [
	'endpoints/frontpage',
	'endpoints/volumes',
	'endpoints/get-structure'
];

const errors = [
	'middlewares/05-error'
];

const handlers = middlewares.concat(endpoints).concat(errors);

exports.importHandler = require('./lib/import-handler');

exports.handlers = handlers;
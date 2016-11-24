'use strict';
const handlers = require('modules/handlers').handlers;
const importHandler = require('modules/handlers').importHandler;

const express = require('express');
const app = express();

handlers.forEach(handler => importHandler(handler, app));

module.exports = app;
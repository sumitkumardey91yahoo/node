#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../app');
var debug = require('debug')('e-commeres:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

const PORT = process.env.PORT || '3000';
app.listen(PORT, (req, res) => {
  console.log("port connect", PORT)
});


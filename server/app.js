require('newrelic');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors())
//app.use(express.static(path.join(__dirname, '/../public')));
//app.use('/games/:gameID', express.static(path.join(__dirname, '/../public')));

app.use('/api', createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true }));

module.exports.app = app;

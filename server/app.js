const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(express.static(path.join(__dirname, '/../public')));
app.use('/games/:gameId', express.static(path.join(__dirname, '/../public')));

app.use('/api/mediaData/:gameId', createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true }));

module.exports.app = app;

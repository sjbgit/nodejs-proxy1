const express = require('express');
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

// Create Express Server
const app = express();

//Enable CORS for any unknown origin
app.use(cors());

// Configuration
const PORT = 3001;
const HOST = "localhost";
const API_SERVICE_URL = 'token endpoint here'; //"https://jsonplaceholder.typicode.com";

// Logging
app.use(morgan('dev'));

// Info GET endpoint
app.get('/info', (req, res, next) => {
    res.send('This is a proxy service which proxies to Billing and Account APIs.');
 });

 app.post('/test', (req, res, next) => {
    let body = req.body;
    res.send('This is a proxy service which proxies to Billing and Account APIs.');
 });

//  // Authorization
// app.use('', (req, res, next) => {
//     if (req.headers.authorization) {
//         next();
//     } else {
//         res.sendStatus(403);
//     }
//  });

//testtoken
//devtoken

// Proxy endpoints
app.use('/token', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^/token`]: '',
    },
 }));

 // Start the Proxy
app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
 });
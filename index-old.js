// include dependencies
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// proxy middleware options
/** @type {import('http-proxy-middleware/dist/types').Options} */
const options = {
  target: 'https://mocktarget.apigee.net/echo', // target host with the same base path
  changeOrigin: true, // needed for virtual hosted sites
};

// create the proxy
const exampleProxy = createProxyMiddleware(options);

// mount `exampleProxy` in web server
app.use('/api', exampleProxy);
app.listen(3000);





// const http = require('http');

// http.createServer((req, res) => {
//   const options = {
//     hostname: 'localhost',
//     port: 8080,
//     path: req.url,
//     method: req.method
//   };

//   const proxy = http.request(options, proxyRes => {
//     res.writeHead(proxyRes.statusCode, proxyRes.headers);
//     proxyRes.pipe(res, { end: true });
//   });

//   req.pipe(proxy, { end: true });

// }).listen(3000);


// const express = require('express');
// const proxy = require('http-proxy-middleware');

// const app = express();

// app.use(
//   '/api',
//   proxy({
//     target: 'http://localhost:8080',
//     changeOrigin: true
//   })
// );

// app.listen(3000);

const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Proxy API requests
app.use('/api', createProxyMiddleware({
  target: 'https://script.google.com',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '', // remove /api prefix
  },
}));

app.listen(8000, () => {
  console.log('Proxy server is running on http://localhost:8000');
});
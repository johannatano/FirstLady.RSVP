/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');
const webpackConfiguration = require('../webpack.config');
const environment = require('./environment');
const os = require('os');

// Get local IP address dynamically
const localIp = Object.values(os.networkInterfaces())
  .flat()
  .find((details) => details.family === 'IPv4' && !details.internal).address;

module.exports = merge(webpackConfiguration, {
  mode: 'development',

  /* Manage source maps generation process */
  devtool: 'eval-source-map',

  /* Development Server Configuration */
  devServer: {
    static: {
      directory: environment.paths.output,
      publicPath: '/',
      watch: true,
    },
    client: {
      overlay: true,
    },
    open: false, // Disable auto open
    compress: true,
    hot: false,
    ...environment.server,

    // Set host to local IP and allow external access
    host: localIp, // Set local IP as the host
    port: 8080, // Optional: specify the port
    allowedHosts: 'all', // Allow all hosts to access the server

    // Enable access from local network devices
    https: false, // Enable https if necessary

    proxy: {
      '/api': {
        target: 'https://script.google.com',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }, // Remove /api prefix
      },
    },
  },

  /* File watcher options */
  watchOptions: {
    aggregateTimeout: 300,
    poll: 300,
    ignored: /node_modules/,
  },

  /* Additional plugins configuration */
  plugins: [],
});

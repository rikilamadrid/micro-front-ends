const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const devConfig = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:2323/',
  },
  devServer: {
    port: 2323,
    historyApiFallback: {
      index: '/index.html',
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'host', // never gets used but its part of convention
      remotes: {
        marketing: 'marketing@https://localhost:4444/remoteEntry.js', // route matches the name of remote config app and url we set it up
        auth: 'auth@https://localhost:8082/remoteEntry.js', // route matches the name of remote config app and url we set it up
      },
      shared: packageJson.dependencies, // list of use dependencies to share in order to save network calls
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
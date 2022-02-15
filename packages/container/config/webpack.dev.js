const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const devConfig = {
  mode: 'development',
  devServer: {
    port: 8088,
    historyApiFallback: {
      index: '/index.html',
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'host', // never gets used but its part of convention
      remotes: {
        marketing: 'marketing@http://localhost:8081/remoteEntry.js', // route matches the name of remote config app and url we set it up
      },
      shared: packageJson.dependencies, // list of use dependencies to share in order to save network calls
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
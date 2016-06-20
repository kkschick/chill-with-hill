require('babel-polyfill');

const config = require('./webpack.config');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

new WebpackDevServer(webpack(config), {
  contentBase: './dist/',
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: {
    colors: true,
  },
  proxy: {
    '/api/*': 'http://0.0.0.0:5000', // To hit Flask server
  },
}).listen(3000, '0.0.0.0', (err) => {
  if (err) { console.log(err); }
  console.log('Listening at port 3000');
});

const path = require('path');

module.exports = {
  mode: 'production',
  target: 'web',
  entry: './index.js',
  output: {
    filename: 'nanoidr.bundle.js',
    path: path.resolve(__dirname, 'bundle'),
    libraryTarget: 'var'
  },
  resolve: {
    mainFields: ['browser', 'module', 'main']
  }
};
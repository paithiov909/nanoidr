const path = require('path');

module.exports = {
  target: 'web',
  entry: './srcjs/index.js',
  output: {
    library: 'nanoidr',
    filename: 'nanoidr.bundle.js',
    path: path.resolve(__dirname, 'inst/packer'),
    libraryExport: "default",
    libraryTarget: 'var'
  },
  resolve: {
    mainFields: ['browser', 'module', 'main']
  }
};

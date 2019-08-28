const path = require('path');

module.exports = function getOutput(mode) {
  switch (mode) {
    case 'production':
    default:
      return {
        path: path.join(process.cwd(), 'build'),
        filename: 'js/[name].js',
      };

    case 'development':
      return {
        path: path.join(process.cwd(), 'build'),
        publicPath: '//localhost:3000/build/',
        filename: 'js/[name].js',
      };
  }
};

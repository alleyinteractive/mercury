module.exports = function getDevtool(mode) {
  switch (mode) {
    case 'production':
      return 'source-map';

    case 'development':
      return 'cheap-module-eval-source-map';

    default:
      return 'source-map';
  }
};

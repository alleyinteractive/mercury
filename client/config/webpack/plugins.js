const webpack = require('webpack');

module.exports = function getPlugins(mode) {
  const plugins = [];

  switch (mode) {
    case 'production':
      return plugins;

    case 'development':
      return [
        new webpack.HotModuleReplacementPlugin({
          multiStep: true,
        }),
        ...plugins,
      ];

    default:
      return plugins;
  }
};

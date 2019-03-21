const path = require('path');

const exclude = [
  /node_modules/,
  /\.min\.js$/,
];

module.exports = (env, argv) => {
  const { mode } = argv;

  return {
    devtool: 'development' === mode
      ? 'cheap-module-eval-source-map'
      : 'source-map',
    entry: {
      'workflow': './client/workflow/index.js',
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/react']
              }
            }
          ],
        },
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude,
          use: 'eslint-loader',
        },
        {
          test: /\.s?css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                minimize: {
                  autoprefixer: false,
                },
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: path.join(__dirname, 'postcss.config.js'),
                },
              },
            },
            'sass-loader',
          ],
        },
      ],
    },
    output: {
      filename: '[name].js',
      path: path.join(__dirname, 'build'),
    },
  };
};
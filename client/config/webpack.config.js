const path = require('path');
const getConfigServices = require('./webpack');

const exclude = [
  /node_modules/,
  /\.min\.js$/,
];

module.exports = (env, argv) => {
  const { mode } = argv;
  const config = getConfigServices(mode, env);

  return {
    devtool: config.getDevtool(),
    entry: {
      workflow: path.join(process.cwd(), './client/workflow/index.js'),
    },
    plugins: config.getPlugins(),
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
            },
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
          ],
        },
      ],
    },
    output: config.getOutput(),
    devServer: config.getDevServer(),
  };
};

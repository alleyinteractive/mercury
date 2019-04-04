const getOutput = require('./output');
const getPlugins = require('./plugins');
const getDevtool = require('./devtool');
const getDevServer = require('./devServer');

module.exports = function getConfigService(mode, env) {
  return {
    getOutput: () => getOutput(mode),
    getPlugins: () => getPlugins(mode),
    getDevtool: () => getDevtool(mode),
    getDevServer: () => getDevServer(mode, env),
  };
};

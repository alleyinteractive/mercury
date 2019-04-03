const fs = require('fs');
const path = require('path');
const os = require('os');

module.exports = function getDevServer(mode, env) {
  const certPath = (env && env.certPath) ? path.join(
    os.homedir(),
    env.certPath
  ) : false;
  const http = (env && (env.http || ! env.certPath)) || false;

  switch (mode) {
    case 'development':
      return {
        quiet: false,
        hot: true,
        noInfo: false,
        contentBase: '/build',
        stats: { colors: true },
        headers: { 'Access-Control-Allow-Origin': '*' },
        https: http ? false : {
          cert: fs.readFileSync(
            path.join(certPath, 'server.crt'),
            'utf8'
          ),
          key: fs.readFileSync(
            path.join(certPath, 'server.key'),
            'utf8'
          ),
        },
      };

    default:
      return {};
  }
};

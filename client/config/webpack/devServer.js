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
        hot: true,
        quiet: false,
        noInfo: false,
        contentBase: '/build',
        disableHostCheck: true,
        stats: { colors: true },
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

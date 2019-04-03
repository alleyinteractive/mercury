/* eslint-disable import/no-extraneous-dependencies */
// Plugin imports
const autoprefixer = require('autoprefixer');
const stylelint = require('stylelint');
const stylelintConfig = require('./stylelint.config.js');

// Config
module.exports = () => ({
  plugins: [
    stylelint(stylelintConfig),
    autoprefixer(),
  ],
});

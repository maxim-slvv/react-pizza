/* eslint-disable */
const path = require('path');

module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb'],
  plugins: ['flowtype'],
  env: {
    browser: true,
    jasmine: true,
    protractor: true,
    node: true,
    jest: true,
  },
  rules: {
    semi: [2, 'always'],
    'no-extra-semi': 2,
    // XXX: Due to an error in the webpack import and
    // vvv concern that we are coupling too many things
    // vvv into our lintint/commiting process I am gonna lower the
    // vvv level of this rule to a warning. We should explore
    // vvv if we wanna either remove or fix this in the future.
    'import/no-extraneous-dependencies': 1,
    'key-spacing': ['off'],
    'react/jsx-filename-extension': [0, { extensions: ['.js', '.jsx'] }],
    'no-underscore-dangle': [
      2,
      { allow: ['_meta', '_items', '_status', '_super', '_ui', '_data'] },
    ],
  },
  globals: {
    EC: true,
    waitTimeout: true,
  },
  settings: {
    flowtype: {
      onlyFilesWithFlowAnnotation: true,
    },
    // XXX: related to above rule and "eslint-import-resolver-webpack" package
    // look at https://github.com/benmosher/eslint-plugin-import/issues/799
    'import/resolver': {
      webpack: {
        config: path.resolve(__dirname, 'webpack.config.js'),
      },
    },
  },
};

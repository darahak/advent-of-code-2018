module.exports = {
  parserOptions: {
    ecmaVersion: 2018
  },
  env: {
    es6: true,
    node: true
  },
  extends: ['eslint:recommended', 'prettier', 'plugin:jest/recommended'],
  rules: {
    'no-console': 0
  }
};

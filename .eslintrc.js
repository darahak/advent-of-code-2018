module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: ['eslint:recommended', 'prettier', 'plugin:jest/recommended'],
  rules: {
    'no-console': 0
  }
};

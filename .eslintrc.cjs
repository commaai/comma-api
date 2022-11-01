module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    camelcase: 'off',
    'import/prefer-default-export': 'off',
    'max-classes-per-file': 'off',
    'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1 }],
  },
};

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: ['import', '@typescript-eslint'],
  rules: {},
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    '@typescript-eslint/consistent-type-imports': 'error',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['#components', './src/components'],
          ['#hooks', './src/hooks'],
          ['#store', './src/store'],
          ['#stubs', './src/stubs'],
          ['#const', './src/const'],
          ['#types', './src/types'],
        ],
        extensions: ['.ts', '.tsx', '.json'],
      },
    },
  },
};

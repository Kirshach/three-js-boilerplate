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
  ],

  parser: '@typescript-eslint/parser',

  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  plugins: ['import', '@typescript-eslint'],
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

  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    '@typescript-eslint/consistent-type-imports': 1,
  },
};

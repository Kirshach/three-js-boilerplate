module.exports = {
  env: {
    browser: true,
    es2021: true,
  },

  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],

  parser: '@typescript-eslint/parser',

  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  plugins: ['react', 'react-hooks', 'import', '@typescript-eslint'],
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
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/consistent-type-imports': 1,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': [
      'warn',
      {
        additionalHooks: '(useRecoilCallback|useRecoilTransaction_UNSTABLE)',
      },
    ],
    'import/order': [
      1,
      {
        groups: ['builtin', 'external', 'internal', 'unknown', 'parent', 'sibling'],
        'newlines-between': 'always',
        pathGroups: [
          {
            pattern: '#components/*',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '#hooks/*',
            group: 'internal',
          },
          {
            pattern: '#store/*',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '#stubs/*',
            group: 'unknown',
            position: 'before',
          },
          {
            pattern: '#const/*',
            group: 'unknown',
            position: 'after',
          },
          {
            pattern: '#types/*',
            group: 'parent',
            position: 'before',
          },
          {
            pattern: '#+(*)', // everything else that starts with "#"
            group: 'parent',
            position: 'before',
          },
        ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
};

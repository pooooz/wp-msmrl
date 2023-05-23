module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json']
  },
  plugins: [
    'react'
  ],
  rules: {
    '@typescript-eslint/semi': 0,
    semi: ['error', 'always'],
    '@typescript-eslint/member-delimiter-style': ['error', {
      multiline: {
        delimiter: 'semi',
        requireLast: true
      }
    }],

    'no-console': ['warn', { allow: ['warn'] }],
    '@typescript-eslint/naming-convention': ['warn'],
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/strict-boolean-expressions': 0,
    '@typescript-eslint/restrict-template-expressions': 0,
    '@typescript-eslint/prefer-nullish-coalescing': 0,
    '@typescript-eslint/triple-slash-reference': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-confusing-void-expression': 0,
    '@typescript-eslint/consistent-type-imports': 0,
    '@typescript-eslint/space-before-function-paren': 0,
    'generator-star-spacing': 0
  }
};

import js from '@eslint/js'
import globals from 'globals'
import prettier from 'eslint-config-prettier'

/* @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    ignores: ['node_modules/', 'dist/', 'build/'], // Ignore unnecessary files
  },
  js.configs.recommended,
  prettier, // Disable rules that conflict with Prettier
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.node, ...globals.browser },
    },
    rules: {
      semi: ['error', 'never'],
      indent: ['error', 2],
      'no-trailing-spaces': ['error'],
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'object-curly-spacing': ['error', 'always'],
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'single'],
      'no-unused-vars': ['warn'],
      'no-console': 'off',
    },
  },
]

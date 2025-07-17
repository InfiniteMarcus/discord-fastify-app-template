import { defineConfig, globalIgnores } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  globalIgnores(['./dist', './node_modules']),
  {
    extends: compat.extends(
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier',
    ),

    plugins: {
      '@typescript-eslint': typescriptEslint,
      import: importPlugin,
      prettier,
    },

    languageOptions: {
      globals: {
        ...globals.node,
      },

      parser: tsParser,
      ecmaVersion: 12,
      sourceType: 'module',
    },

    settings: {
      'import/resolver': {
        typescript: {},
        node: {
          extensions: ['.mjs', '.js', '.json', '.ts'],
        },
      },
      'import/ignore': [
        'node_modules',
        '\\.(coffee|scss|css|less|hbs|svg|json)$',
      ],
    },

    rules: {
      'import/no-unresolved': [
        'error',
        { commonjs: true, caseSensitive: true },
      ],
      'import/named': 'error',
      'import/export': 'error',
      'import/no-named-as-default': 'error',
      'import/no-named-as-default-member': 'error',
      'import/no-mutable-exports': 'error',
      'import/no-amd': 'error',
      'import/first': 'error',
      'import/no-duplicates': 'error',

      'import/order': [
        'error',
        { groups: [['builtin', 'external', 'internal']] },
      ],

      'import/newline-after-import': 'error',
      'import/no-absolute-path': 'error',
      'import/no-dynamic-require': 'error',

      'import/no-webpack-loader-syntax': 'error',
      'import/no-named-default': 'error',
      'import/no-self-import': 'error',
      'import/no-cycle': ['error', { maxDepth: '∞' }],
      'import/no-useless-path-segments': ['error', { commonjs: true }],
      'import/dynamic-import-chunkname': [
        'off',
        {
          importFunctions: [],
          webpackChunknameFormat: '[0-9a-zA-Z-_/.]+',
        },
      ],

      'import/no-relative-parent-imports': 'off',
      'import/no-unused-modules': [
        'off',
        {
          ignoreExports: [],
          missingExports: true,
          unusedExports: true,
        },
      ],

      'import/no-import-module-exports': [
        'error',
        {
          exceptions: [],
        },
      ],

      'import/no-relative-packages': 'error',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],

      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          endOfLine: 'auto',
        },
      ],
    },
  },
]);

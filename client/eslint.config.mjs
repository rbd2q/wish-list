import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';
import prettierPlugin from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default defineConfig([
  ...nextVitals,
  ...nextTypescript,
  prettier,
  {
    plugins: { prettier: prettierPlugin, 'simple-import-sort': simpleImportSort },
    rules: {
      'prettier/prettier': 'error',
      'padding-line-between-statements': ['error', { blankLine: 'always', prev: '*', next: 'if' }],
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react/button-has-type': 'warn',
      '@typescript-eslint/no-use-before-define': 'error',
    },
  },
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);

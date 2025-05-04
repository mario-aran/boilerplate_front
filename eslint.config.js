import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import checkFile from 'eslint-plugin-check-file';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      'dist',
      'coverage', // "@vitest/coverage-v8"
      'src/components/shadcn-ui', // "shadcn" components
    ],
  },

  // Base config
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020, // Should match target version in "tsconfig.json"
      globals: globals.browser,
    },
    extends: [
      // "eslint", "typescript-eslint": Must be placed first, starting with eslint
      js.configs.recommended,
      tseslint.configs.strict,
      tseslint.configs.stylistic,

      eslintConfigPrettier, // "eslint-config-prettier": Must be placed last
    ],
    plugins: {
      'react-hooks': reactHooks, // "eslint-plugin-react-hooks"
      'react-refresh': reactRefresh, // "eslint-plugin-react-refresh"
      'check-file': checkFile, // "eslint-plugin-check-file"
    },
    rules: {
      // "eslint": Prevent imports
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            { group: ['../**', 'src/*'], message: "Use '@/' instead" },
            { group: ['@radix-ui/*'], message: "Use '/shadcn-ui' instead." },
          ],
          paths: [
            { name: 'next-themes', message: "Use '/theme-provider' instead." },
            {
              name: 'sonner',
              importNames: ['Toaster'],
              message: "Use '/sonner' instead.",
            },
          ],
        },
      ],

      // "eslint-plugin-react-hooks"
      ...reactHooks.configs.recommended.rules,

      // "eslint-plugin-react-refresh"
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // "eslint-plugin-check-file": Force naming conventions
      'check-file/folder-naming-convention': [
        'error',
        { 'src/**/!(__tests__)': 'KEBAB_CASE' },
      ],
      'check-file/filename-naming-convention': [
        'error',
        { '**/*.{ts,tsx}': 'KEBAB_CASE' },
        { ignoreMiddleExtensions: true },
      ],
    },
  },
);

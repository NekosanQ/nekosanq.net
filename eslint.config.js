import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';
import prettierPlugin from 'eslint-plugin-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname
      }
    },
    plugins: {
      js,
      prettier: prettierPlugin,
      'react-x': reactX,
      'react-dom': reactDom
    },
    extends: ['js/recommended'],
    rules: {
      // Prettierのルールを適用
      'prettier/prettier': 'error',
      // React X / React DOM 推奨ルール
      ...reactX.configs['recommended-typescript'].rules,
      ...reactDom.configs.recommended.rules
    }
  },

  // TypeScript + 型付きルール (本番向け)
  {
    files: ['**/*.{ts,tsx}'],
    ...tseslint.config({
      extends: [
        // 本番向け推奨ルール（推奨 or strict を選択可能）
        ...tseslint.configs.recommendedTypeChecked,
        // ...tseslint.configs.strictTypeChecked,
        // コードスタイルルールも含めるならこちらも
        ...tseslint.configs.stylisticTypeChecked
      ],
      languageOptions: {
        parserOptions: {
          project: ['./tsconfig.node.json', './tsconfig.app.json'],
          tsconfigRootDir: import.meta.dirname
        }
      }
    })
  },

  // React 推奨ルール (基本)
  pluginReact.configs.flat.recommended,

  // Prettierと互換性を保つための最後のルール
  {
    name: 'prettier-config',
    rules: {
      ...prettierPlugin.configs.recommended.rules
    }
  }
]);

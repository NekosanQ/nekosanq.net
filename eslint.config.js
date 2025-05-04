import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import prettierPlugin from 'eslint-plugin-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
        plugins: { js, prettier: prettierPlugin },
        extends: ['js/recommended', 'prettier'],
        rules: {
            // Prettier での整形エラーを ESLint エラーとして扱う
            'prettier/prettier': 'error'
        }
    },
    {
        files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
        languageOptions: {
            globals: globals.browser
        }
    },
    tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    {
        // Prettierとの互換性を保つために、Prettier推奨設定を最後に適用
        name: 'prettier-config',
        rules: {
            ...prettierPlugin.configs.recommended.rules
        }
    }
]);

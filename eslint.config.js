import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import prettier from "eslint-config-prettier";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [".next/**", "node_modules/**", "dist/**", "next-env.d.ts"]
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,mjs,ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "@next/next": nextPlugin
    },
    settings: {
      react: {
        version: "detect"
      }
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      "react/react-in-jsx-scope": "off",
      "react/no-unknown-property": "off",
      "react/prop-types": "off"
    }
  },
  prettier
);

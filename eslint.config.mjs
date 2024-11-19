import jsLint from "@eslint/js";
import reactQueryLint from "@tanstack/eslint-plugin-query";
import typescript from "@typescript-eslint/eslint-plugin";
import prettierConfig from "eslint-config-prettier";
import react from "eslint-plugin-react";
import reactHooksLint from "eslint-plugin-react-hooks";
import reactRefreshLint from "eslint-plugin-react-refresh";
import pluginSimpleImportSort from "eslint-plugin-simple-import-sort";
import storybookLint from "eslint-plugin-storybook";
import globals from "globals";
import tsLint from "typescript-eslint";

export default [
  jsLint.configs.recommended,
  ...tsLint.configs.recommended,
  prettierConfig,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    ignores: ["**/build", "**/dist", "**/node_modules", "**/styled-system"],
  },
  {
    plugins: {
      "simple-import-sort": pluginSimpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsLint.parser,
    },
    plugins: {
      "@typescript-eslint": typescript,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "error",
    },
  },
  {
    files: ["**/*.{jsx,tsx}"],
    ...react.configs.flat.recommended,
    ...react.configs.flat["jsx-runtime"],
    plugins: {
      "@tanstack/query": reactQueryLint.configs.recommended,
      "react-hooks": reactHooksLint.configs.recommended,
      "react-refresh": reactRefreshLint,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "object-shorthand": "error",
      "no-console": "warn",
    },
  },
  {
    files: ["**/*.{stories.tsx}"],
    plugins: {
      storybook: storybookLint,
    },
  },
];

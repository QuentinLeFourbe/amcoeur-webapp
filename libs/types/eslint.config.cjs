const tseslint = require("@typescript-eslint/eslint-plugin");
const tsparser = require("@typescript-eslint/parser");

module.exports = [
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@typescript-eslint": tseslint,
    },
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": ["warn", { args: "none", ignoreRestSiblings: true }],
      "@typescript-eslint/no-namespace": "error",
      "@typescript-eslint/no-useless-constructor": "warn",
      "@typescript-eslint/no-array-constructor": "warn",
    },
  },
  {
    ignores: ["vite.config.mts", "dist/**", "node_modules/**"],
  },
];

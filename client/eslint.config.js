const { ESLint } = require("eslint");

module.exports = [
  {
    files: ["src/**/*.{js,ts,tsx}"],
    ignores: ["node_modules"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: require("@typescript-eslint/parser"),
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // enable parsing next/react jsx files
        },
      },
    },
    plugins: {
      prettier: require("eslint-plugin-prettier"),
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin"), // TypeScript rules
      react: require("eslint-plugin-react"), // React rules
    },
    rules: {
      "prettier/prettier": "error",
      "@typescript-eslint/no-unused-vars": "warn",
      "react/jsx-uses-react": "error", // React JSX rule
      "react/jsx-uses-vars": "error", // React JSX rule
    },
  },
];

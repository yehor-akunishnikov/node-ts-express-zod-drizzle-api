import globals from "globals";
import eslint from "@eslint/js";
import tsEslint from "typescript-eslint";
import stylisticJs from "@stylistic/eslint-plugin-js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [
      "dist",
      "eslint.config.mjs",
      "drizzle.config.ts"
    ]
  },
  {
    files: [
      "./src/**/*.{ts}",
    ]
  },
  {
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    }
  },
  {
    plugins: {
      "@stylistic/js": stylisticJs
    },
  },
  {
    rules: {
      "@stylistic/js/indent": ["error", 2],
      "@stylistic/js/semi": ["error"],
      "@stylistic/js/eol-last": ["error"],
      "@stylistic/js/quotes": ["error"],
      "@stylistic/js/max-len": ["error", 130],
    },
  },
  eslint.configs.recommended,
  ...tsEslint.configs.recommendedTypeChecked,
  ...tsEslint.configs.stylisticTypeChecked,
  {
    rules: {
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-misused-promises": "off"
    }
  }
];

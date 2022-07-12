module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module"
  },
  plugins: ["@typescript-eslint", "prettier"],
  extends: ["airbnb", "eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
  settings: {
    "import/resolver": {
      typescript: {}
    },
    "prettier/prettier": {
      singleQuote: false,
      semi: true
    }
  },
  root: true,
  env: {
    node: true,
    jest: true
  },
  ignorePatterns: [".eslintrc.js"],
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "no-duplicate-imports": "error",
    "import/no-named-default": "off",
    "@typescript-eslint/no-shadow": ["error"],
    "no-shadow": "off",
    "import/extensions": ["error", "never", { svg: "always" }],
    quotes: ["error", "double"],
    "prettier/prettier": 2,
    semi: ["error", "always"],
    "class-methods-use-this": "off",
    "import/order": [
      2,
      {
        groups: ["external", "builtin", "index", "sibling", "parent", "internal", "type"],
        alphabetize: {
          order: "asc",
          caseInsensitive: true
        },
        "newlines-between": "always-and-inside-groups"
      }
    ]
  }
};

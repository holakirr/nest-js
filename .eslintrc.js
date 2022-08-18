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
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
      }
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
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-shadow": ["error"],
    "class-methods-use-this": "off",
    "import/extensions": ["error", "never", { svg: "always" }],
    "import/no-named-default": "off",
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal", ["parent", "sibling", "index"], "object", "type"],
        alphabetize: {
          order: "asc",
          caseInsensitive: true
        },
        "newlines-between": "always"
      }
    ],
    "import/prefer-default-export": "off",
    "max-classes-per-file": 0,
    "no-duplicate-imports": "error",
    "no-shadow": "off",
    "no-useless-constructor": "off",
    "prettier/prettier": 2,
    quotes: ["error", "double"],
    semi: ["error", "always"]
  }
};

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  "rules": {
    "react/jsx-no-target-blank": "off",
    "react-refresh/only-export-components": [
      "warn",
      { "allowConstantExport": true }
    ],
    "no-unused-vars": [
      "warn",
      { "vars": "all", "args": "after-used", "ignoreRestSiblings": true }
    ],
    "react/prop-types": "off", // Enable if using PropTypes to check prop usage
    "react/jsx-uses-react": "warn", // Ensure that JSX files are properly parsed
    "react/jsx-uses-vars": "warn" // Prevent variables used in JSX from being incorrectly marked as unused
  }
}

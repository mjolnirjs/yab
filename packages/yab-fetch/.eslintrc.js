module.exports = {
  extends: [
    "airbnb-base",
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint'
  ],
  rules: {
    "import/prefer-default-export": "off"
  }
};

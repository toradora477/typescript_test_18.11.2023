module.exports = {
  extends: ['eslint:recommended', 'prettier', 'react-app', 'plugin:cypress/recommended'],
  rules: {
    'react-hooks/exhaustive-deps': 0,
  },
};

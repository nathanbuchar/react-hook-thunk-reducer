module.exports = {
  extends: 'airbnb-base',
  rules: {
    'arrow-body-style': 'off',
    'arrow-parens': ['error', 'always'],
    'import/no-extraneous-dependencies': ['error', {
      peerDependencies: true,
    }],
    'no-unused-vars': ['error', {
      // Allow variables with leading underscores.
      argsIgnorePattern: '^_',
    }],
  },
};

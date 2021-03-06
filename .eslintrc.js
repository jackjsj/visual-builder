module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: ['plugin:vue/essential', '@vue/airbnb'],
  rules: {
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'linebreak-style': ['off', 'windows'],
    'no-param-reassign': ['error', { props: false }],
    'operator-linebreak': ['off'],
    'import/extensions': ['off'],
    'object-curly-newline': ['off'],
    'global-require': ['off'],
    'arrow-parens': ['off'],
    'import/prefer-default-export': ['off'],
    'guard-for-in': ['off'],
    'no-restricted-syntax': ['off'],
    'no-plusplus': ['off'],
    'no-new': ['off'],
    eqeqeq: ['off'],
    'no-void': ['off'],
    camelcase: ['off'],
    'import/no-dynamic-require': ['off'],
    'no-underscore-dangle': ['off'],
    'consistent-return': ['off'],
    'default-case': ['off'],
    'no-unused-expressions': ['off'],
    'no-unused-vars': ['off'],
    'vue/no-unused-vars': ['off'],
    'import/no-unresolved': ['off'],
    'class-methods-use-this': ['off'],
    'implicit-arrow-linebreak': ['off'],
    'function-paren-newline': ['off'],
    'import/no-extraneous-dependencies': ['off'],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};

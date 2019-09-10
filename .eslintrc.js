module.exports = {
  'extends': [
    'airbnb',
    'prettier',
  ],
  'globals': {
    'jest': true,
    'expect': true,
    'it': true,
    'describe': true,
    'beforeEach': true,
    'mount': true,
    'shallow': true,
  },
  'env': {
    'node': true
  },
  'rules': {
    'no-unused-vars': ['error'],
    'no-underscore-dangle': [0],
    'consistent-return': [0],
    'import/no-unresolved': [
      'error',
      {
        'ignore': [
          'db/',
        ]
      }
    ],
  }
};
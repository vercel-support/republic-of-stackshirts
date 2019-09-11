module.exports = (api) => {

  api.cache(true);

  return {
    'presets': [
      [
        '@babel/preset-env',
        {
          'targets': {
            'node': 'current'
          },
          'modules': 'commonjs'
        }
      ]
    ],
    'plugins': [],
    'ignore': [
      '**/*.spec.js',
      '**/*.test.js',
      '**/*.stories.js',
      '**/*.md'
    ]
  };


};

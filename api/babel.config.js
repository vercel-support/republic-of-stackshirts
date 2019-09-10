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
    'plugins': [
      'convert-to-json',
      'dynamic-import-node',
    ],
    'ignore': [
      '**/*.spec.js',
      '**/*.test.js',
      '**/*.stories.js',
      '**/*.md'
    ]
  };


};

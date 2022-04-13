const getWebpackConfig = require('@nrwl/react/plugins/webpack');

function getCustomWebpackConfig(webpackConfig) {
  const config = getWebpackConfig(webpackConfig);

  const babelLoader = config.module.rules.find(
    rule => typeof rule !== 'string' && rule.loader?.toString().includes('babel-loader')
  );

  if (babelLoader && typeof babelLoader !== 'string') {
    babelLoader.options['presets'] = [
      ...(babelLoader.options['presets'] || []),
      'module:metro-react-native-babel-preset',
    ];
    babelLoader.options['plugins'] = [
      ...(babelLoader.options['plugins'] || []),
      'react-native-web',
    ];
  }

  config.resolve.alias = {
    ...config.resolve.alias,
    'react-native$': 'react-native-web'
  };

  config.resolve.extensions = [
    ...config.resolve.extensions.map(extension => `.web${extension}`),
    ...config.resolve.extensions
  ];

  config.node = {
    global: true
  };

  return config;
}

module.exports = getCustomWebpackConfig;

const fs = require('fs');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CWD_PATH = fs.realpathSync(process.cwd());
const SOURCE_PATH = path.join(CWD_PATH, 'src');

const appDirectory = path.resolve(__dirname);

const babelLoaderConfiguration = {
  test: /\.([jt])sx?$/,
  use: {
    loader: 'babel-loader',
    options: {
      cwd: appDirectory,
      envName: 'development',
      babelrc: true,
      cacheDirectory: true,
      rootMode: 'upward',
      cacheCompression: false
    }
  }
};

const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]',
      esModule: false
    }
  }
};

const cssLoaderConfiguration = {
  test: /\.css$/i,
  use: ['style-loader', 'css-loader']
};

const svgRule = {
  test: /\.(js|mjs|jsx|ts|tsx)$/,
  include: SOURCE_PATH,
  loader: require.resolve('babel-loader'),
  options: {
    customize: require.resolve('babel-preset-react-app/webpack-overrides'),
    plugins: [
      [
        require.resolve('babel-plugin-named-asset-import'),
        {
          loaderMap: {
            svg: {
              ReactComponent: '@svgr/webpack?-svgo,+titleProp,+ref![path]'
            }
          }
        }
      ]
    ],
    // This is a feature of `babel-loader` for webpack (not Babel itself).
    // It enables caching results in ./node_modules/.cache/babel-loader/
    // directory for faster rebuilds.
    cacheDirectory: true,
    // See #6846 for context on why cacheCompression is disabled
    cacheCompression: false,
    compact: false
  }
};

module.exports = {
  target: 'web',

  devtool: 'source-map',

  externals: {
    bufferutil: 'commonjs bufferutil',
    'utf-8-validate': 'commonjs utf-8-validate'
  },

  entry: [path.resolve(appDirectory, 'index.ts')],

  output: {
    path: path.resolve(appDirectory, 'dist')
  },

  module: {
    rules: [babelLoaderConfiguration, imageLoaderConfiguration, cssLoaderConfiguration, svgRule]
  },

  resolve: {
    mainFields: ['browser', 'main', 'module'],
    alias: {
      'react-native$': 'react-native-web'
    },
    plugins: [new TsconfigPathsPlugin()],
    modules: [path.resolve(__dirname, 'node_modules')],
    extensions: ['.web.ts', '.web.tsx', '.web.mjs', '.web.js', '.web.jsx', '.ts', '.tsx', '.mjs', '.js', '.jsx'],
    fallback: {
      crypto: false,
      fs: false,
      http: false,
      https: false,
      net: false,
      path: false,
      stream: require.resolve('readable-stream'),
      tls: false,
      util: false,
      url: false,
      zlib: false,
      ws: false,
      os: false
    }
  },

  plugins: [
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(process.env.NODE_ENV === 'development')
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'public',
          globOptions: {
            ignore: ['**/index.html']
          }
        },
        { from: 'node_modules/wasm-themis/src/libthemis.wasm' }
      ]
    }),
    new HtmlWebpackPlugin({
      template: 'public/index.html'
    })
  ]
};

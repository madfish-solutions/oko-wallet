const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

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
    rules: [babelLoaderConfiguration, imageLoaderConfiguration, cssLoaderConfiguration]
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
      ws: false
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

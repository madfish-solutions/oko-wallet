const path = require('path');
const webpack = require('webpack');

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DotenvPlugin = require('dotenv-webpack');

const packageJSON = require('./package.json');

const isDevelopment = process.env.NODE_ENV === 'development';
const appDirectory = path.resolve(__dirname);

const babelLoaderConfiguration = {
    test: /\.(js|jsx|ts|tsx|svg)$/,
    exclude: [new RegExp('node_modules\\' + path.sep + '@dicebear')],
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
    test: /\.(gif|jpe?g|png)$/,
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

const LIBS = ['ui', 'shared', 'shelter'];

const aliasConfiguration = LIBS.reduce((acc, name) => ({
    ...acc,
    [name]: path.resolve(__dirname, `../../libs/${name}/src`),
}), {});

const modulesConfiguration = LIBS.map(name => path.resolve(__dirname, `../../libs/${name}/node_modules`));

module.exports = {
    target: 'web',

    devtool: 'source-map',

    externals: {
        bufferutil: 'commonjs bufferutil',
        'utf-8-validate': 'commonjs utf-8-validate'
    },

    entry: {
        'background-script': path.resolve(appDirectory, 'background-script.ts'),
        'content-script': path.resolve(appDirectory, 'content-script.ts'),
        'inpage': path.resolve(appDirectory, 'inpage.ts'),
        main: path.resolve(appDirectory, 'index.ts')
    },

    output: {
        path: path.resolve(appDirectory, 'dist'),
        filename: 'scripts/[name].js',
        chunkFilename: 'scripts/[name].chunk.js',
        pathinfo: isDevelopment ? 'verbose' : undefined,
    },

    module: {
        rules: [babelLoaderConfiguration, imageLoaderConfiguration, cssLoaderConfiguration]
    },

    resolve: {
        mainFields: ['browser', 'main', 'module'],
        alias: {
            'react-native$': 'react-native-web',
            ...aliasConfiguration
        },
        plugins: [new TsconfigPathsPlugin()],
        modules: [
            path.resolve(__dirname, 'node_modules'),
            ...modulesConfiguration
        ],
        extensions: ['.web.ts', '.web.tsx', '.web.mjs', '.web.js', '.web.jsx', '.ts', '.tsx', '.mjs', '.js', '.jsx'],
        fallback: {
            crypto: false,
            fs: false,
            http: false,
            https: false,
            net: false,
            path: require.resolve('path-browserify'),
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
            __DEV__: JSON.stringify(isDevelopment),
            'process.env.VERSION': JSON.stringify(packageJSON.version),
        }),
        new webpack.ProvidePlugin({
            process: "process/browser"
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: 'public',
                    globOptions: {
                        ignore: [
                            '**/popup.html',
                            '**/fullpage.html'
                        ]
                    }
                },
                {from: '../../libs/shelter/node_modules/wasm-themis/src/libthemis.wasm', to: 'scripts/libthemis.wasm'}
            ]
        }),
        new HtmlWebpackPlugin({
            template: 'public/popup.html',
            filename: 'popup.html',
            chunks: ['main']
        }),
        new HtmlWebpackPlugin({
            template: 'public/fullpage.html',
            filename: 'fullpage.html',
            chunks: ['main']
        }),
        new DotenvPlugin()
    ]
};

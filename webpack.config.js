// resolve用于将相对路径转为绝对路径
// http://javascript.ruanyifeng.com/nodejs/path.html#toc1
const resolve = require('path').resolve;
// webpack 自带的插件
// const webpack = require('webpack');

// html-webpack-plugin用于生成一个html5文件
// https://doc.webpack-china.org/plugins/html-webpack-plugin/
const HtmlWebpackPlugin = require('html-webpack-plugin');

const url = require('url');

const publicPath = '';

module.exports = (options = {}) => ({
  entry: {
    index: './src/scripts/main.js'
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: options.dev ? '[name].js' : '[name].js?[chunkhash]',
    chunkFilename: '[id].js?[chunkhash]',
    publicPath: options.dev ? '/assets/' : publicPath
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      }, {
        test: /\.vue$/,
        use: ['vue-loader']
      }, {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      }, {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader?sourceMap', 'postcss-loader']
      }, {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }]
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'common',
    },
    runtimeChunk: {
      name: 'runtime',
    }
  },
  resolve: {
    alias: {
      Styles: resolve(__dirname, 'src/styles')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ],
  performance: {
    hints: false
  },
  devServer: {
    host: '127.0.0.1',
    port: 8010,
    proxy: {
      '/api/': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    historyApiFallback: {
      index: url.parse(options.dev ? '/assets/' : publicPath).pathname
    }
  },
  devtool: options.dev ? '#eval-source-map' : '#source-map'
});
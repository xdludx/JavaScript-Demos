// resolve用于将相对路径转为绝对路径
// http://javascript.ruanyifeng.com/nodejs/path.html#toc1
const resolve = require('path').resolve;
// webpack 自带的插件
const webpack = require('webpack');

// html-webpack-plugin用于生成一个html5文件
// https://doc.webpack-china.org/plugins/html-webpack-plugin/
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 用于查看打包相关的信息
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const url = require('url');

const publicPath = '';

// 打包默认将css放到页面的style标签中，extract-text-webpack-plugin可以将css文件提取到一个单独的style.css文件。
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
        use: {
          loader: 'vue-loader',
          options: {
            loaders: {
              scss: [
                'vue-style-loader',
                'css-loader',
                'sass-loader',
                {
                  loader: 'sass-resources-loader',
                  options: {
                    resources: resolve(__dirname, './src/styles/common/global.scss')
                  }
                }
              ]
            }
          }
        }
      }, {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      }, {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }, {
      //   test: /\.scss$/,
      //   use: ['style-loader', 'css-loader', 'sass-loader?sourceMap', 'postcss-loader']
      // }, {
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
      template: 'src/index.html',
      favicon: 'src/images/favicon.ico'
    }),
    new ExtractTextPlugin('style.css'),
    // DefinePlugin定义全局变量
    new webpack.DefinePlugin({
      VERSION: JSON.stringify("5fa3b9")
    })
    // new BundleAnalyzerPlugin({
    //   openAnalyzer: false
    // })
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
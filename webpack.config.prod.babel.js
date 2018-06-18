import webpack from 'webpack';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';

const ROOT_PATH = path.resolve(__dirname);
const SRC_PATH = path.resolve(ROOT_PATH, 'src');
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

export default {
  mode: 'production',
  entry: {
    main: [
      'babel-polyfill',
      path.resolve(SRC_PATH, 'index.js'),
    ]
  },
  output: {
    path: BUILD_PATH,
    publicPath: './',
    filename: '[name].[hash].js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /node_modules/,
          enforce: true
        }
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.[chunkhash].css',
      disable: false,
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      inject: true,
      hash: true,
      template: path.resolve(SRC_PATH, 'index.html'),
      filename: 'index.html',
      title: 'ＣＵＬＴＵＲＥ　ＥＮＧＩＮＥ',
      favicon: 'src/assets/favicon.png'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin([BUILD_PATH])
  ],
  devtool: 'eval',
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          {
            loader: 'eslint-loader',
            options: {
              fix: true,
              failOnError: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?.*$|$)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          // 'css-hot-loader',
          MiniCssExtractPlugin.loader,
          // 'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: true,
              localIdentName: '[path]___[name]__[local]___[hash:base64:5]'
            }
          },
          'postcss-loader'
        ]
      }
    ]
  }
};

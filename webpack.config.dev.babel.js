import webpack from 'webpack';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackHarddiskPlugin from 'html-webpack-harddisk-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';

const ROOT_PATH = path.resolve(__dirname);
const SRC_PATH = path.resolve(ROOT_PATH, 'src');
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

export default {
  mode: 'development',
  entry: {
    main: [
      'babel-polyfill',
      path.resolve(SRC_PATH, 'index.js'),
    ]
  },
  output: {
    path: BUILD_PATH,
    publicPath: '/dist',
    filename: '[name].[hash].js'
  },
  devServer: {
    contentBase: BUILD_PATH,
    hot: true,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
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
      alwaysWriteToDisk: true,
      title: 'ＣＵＬＴＵＲＥ　ＥＮＧＩＮＥ',
      favicon: 'src/assets/favicon.png'
    }),
    new HtmlWebpackHarddiskPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin([BUILD_PATH])
  ],
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
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

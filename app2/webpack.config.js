const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const { ModuleFederationPlugin } = webpack.container;

const dependencies = require('./package.json').dependencies;

module.exports = ({ development, ...args }) => {

  return {
    mode: development ? 'development' : 'production',
    entry: './src/index.js',
    devServer: {
      static: path.join(__dirname, "dist"),
      port: 3001,
    },
    output: {
      publicPath: "auto",
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(png|svg|jpe?g|gif)$/,
          use: ['file-loader'],
        },
      ],
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'app2',
        filename: 'remoteEntry.js',
        exposes: {
          './Awesome': './src/components/Awesome'
        },
        shared: {
          ...dependencies,
          react: {
            eager: true,
          },
          'react-dom': {
            eager: true,
          },
          polished: {
            eager: true,
          },
          'styled-components': {
            eager: true,
          }
        },
      }),
      new HtmlWebpackPlugin({
        template: './src/public/index.html',
        filename: 'index.html',
      }),
      new webpack.ProgressPlugin(),
      new webpack.HotModuleReplacementPlugin(),
    ],
    resolve: {
      alias: {
        components: path.resolve(__dirname, 'src/components/'),
        ducks: path.resolve(__dirname, 'src/ducks/'),
        static: path.resolve(__dirname, 'src/static/'),
      },
    },
  }
};

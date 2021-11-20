const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const { ModuleFederationPlugin } = webpack.container;

const dependencies = require('./package.json').dependencies;

module.exports = ({ development, ...args }) => {

  console.log(dependencies)

  return {
    mode: development ? 'development' : 'production',
    entry: './src/index.js',
    output: {
      publicPath: "auto",
    },
    devServer: {
      static: path.join(__dirname, "dist"),
      port: 3000,
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
        name: 'appCore',
        remotes: {
          app2: 'app2@http://localhost:3001/remoteEntry.js'
        },
        shared: {
          ...dependencies,
          react: {
            eager: true,
            singleton: true,
          },
          'react-dom': {
            eager: true,
            singleton: true,
          },
          polished: {
            eager: true,
            singleton: true,
          },
          'styled-components': {
            eager: true,
            singleton: true,
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

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devServer: {
    port: 3001,
    open: true,
    hot: true,
  },
  output: {
    publicPath: 'http://localhost:3001/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'appBRemote',
      filename: 'remoteEntry.js', // This file will be consumed by App A
      exposes: {
        // Expose ProductCatalog component for other apps to use
        './ProductCatalog': './src/components/ProductCatalog',
      },
      shared: {
        react: { 
          singleton: true, 
          requiredVersion: '^18.2.0',
          eager: false  // Important: Don't load React eagerly
        },
        'react-dom': { 
          singleton: true, 
          requiredVersion: '^18.2.0',
          eager: false  // Important: Don't load React-DOM eagerly
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};

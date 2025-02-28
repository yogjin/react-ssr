const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  module: 'development',
  entry: './src/client/main.jsx',
  output: {
    path: path.resolve('dist/client'),
    filename: 'bundle.js',
    clean: true,
    publicPath: './',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(jsx?)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './views/index.html',
      scriptLoading: 'module', // 스크립트 로딩 방식을 모듈로 설정
    }),
    new CopyPlugin({
      patterns: [
        { from: 'public/images', to: 'images' }, // public 폴더의 이미지를 dist로 복사
      ],
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
};

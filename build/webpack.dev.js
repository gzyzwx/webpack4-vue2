const path = require('path');
const webpack = require("webpack");
const { merge } = require('webpack-merge')
const webpackCommon = require('./webpack.common.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const os = require('os')

const getIp = () => {
  let ip = '0.0.0.0'
  const ifaces = os.networkInterfaces()
  for (var i in ifaces) {
    for (var j in ifaces[i]) {
      var val = ifaces[i][j]
      if (val.family === 'IPv4' && val.address !== '127.0.0.1') {
        ip = val.address
        break;
      }
    }
  }
  return ip
}
const ip = getIp()
const port = 10010
module.exports = merge(webpackCommon, {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: path.join(__dirname, "../dist"),
    compress: true,
    // open: true,
    quiet: true,
    hot: true, //开启热更新
    port: port,
    clientLogLevel: 'none',  //关闭浏览器控制台输出的热更新信息
    host: ip,
  },
  module: {
    rules: [
      {
        test: /\.(css)$/,
        include: path.join(__dirname, "../src"),
        use: [
          "style-loader",
          // "thread-loader", // 项目大，loader 花费时间长时用
          "css-loader",
          "postcss-loader"
        ]
      },
      {
        test: /\.(less)$/,
        include: path.join(__dirname, "../src"),
        use: [
          "style-loader",
          // "thread-loader", // 项目大，loader 花费时间长时用
          "css-loader",
          "postcss-loader",
          "less-loader",
        ]
      },
    ]
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin(
      {
        compilationSuccessInfo: {
          messages: [
            `Your application is running here: http://localhost:${port}`,
            `Your application is running here: http://${ip}:${port}`,
          ]
        },
        // 是否每次都清空控制台
        clearConsole: true,
      }
    ),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../public/index.html'),
      env: "development"
    }),
    new webpack.HotModuleReplacementPlugin(),
    // 根据不同环境设置，全局变量
    new webpack.DefinePlugin({
      'process.env': {
        //开发环境，设置全局变量可以在整个项目中调用
        BASE_URL: JSON.stringify('http://localhost:3000/dev')
      }
    })
  ]
});

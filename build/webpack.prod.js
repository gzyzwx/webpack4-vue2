const path = require('path')
const { merge } = require('webpack-merge')
const webpackCommon = require('./webpack.common.js')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MyBannerPlugin = require('./plugins/MyBannerPlugin')
// const webpack = require("webpack");
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = merge(webpackCommon, {
  mode: 'production',
  devtool: false,
  module: {
    rules: [
      {
        test: /\.css$/,
        include: path.join(__dirname, '../src'),
        use: [
          MiniCssExtractPlugin.loader,
          // "thread-loader", // 项目大，loader 花费时间长时用
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        include: path.join(__dirname, '../src'),
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false
            }
          },
          // "thread-loader", // 项目大，loader 花费时间长时用
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      }
    ]
  },
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter'
  },
  optimization: {
    sideEffects: true, //允许副作用配置，配合package.json 配置
    usedExports: true, //只导出被使用的模块
    // 抽离公共代码
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          minSize: 0,
          minChunks: 1,
          priority: 10,
          chunks: 'initial'
        },
        common: {
          name: 'common',
          test: /[\\/]src[\\/]/,
          chunks: 'all',
          minSize: 0,
          minChunks: 2
        }
      }
    },
    minimizer: [
      // 压缩 JS
      new TerserPlugin({
        parallel: true, //开启多线程
        // include: path.join(__dirname, "../src"),
        sourceMap: true, // 如果使用了 SourceMapDevToolPlugin ，需要设置为 true
        extractComments: false, // 默认打包会生成 LICENSE.txt  文件，这里设置禁止生成
        terserOptions: {
          output: {
            comments: false //删除注释
          },
          compress: {
            drop_console: true //删除 console
            // drop_debugger: false //默认为 true, 会删除 debugger
          }
        }
      })
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:8].css'
    }),
    new OptimizeCssAssetsPlugin(),
    new CleanWebpackPlugin(),
    new MyBannerPlugin('版权所有，翻版必究--zwx'),
    // new webpack.BannerPlugin('版权所有，翻版必究--zwx')
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      analyzerHost: '127.0.0.1',
      analyzerPort: 8889,
      reportFilename: 'report.html',
      defaultSizes: 'parsed',
      openAnalyzer: true,
      generateStatsFile: false,
      statsFilename: 'stats.json',
      statsOptions: null,
      logLevel: 'info'
    })
  ]
})

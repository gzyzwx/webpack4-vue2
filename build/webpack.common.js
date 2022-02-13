const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, "../src/main.js"),
  output: {
    path: path.join(__dirname, "../dist"),
    filename: "js/[name].[hash].js"
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, //小于 8K ，用 url-loader 转成 base64 ，否则使用 file-loader 来处理文件
              fallback: {
                loader: 'file-loader',
                options: {
                  name: '[name].[hash:8].[ext]',
                  outputPath: '../dist/assets/images/', //打包之后文件存放的路径, dist/images
                }

              },

            }
          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: '[name].[hash:8].[ext]',
                  outputPath: '../dist/assets/media/',
                }
              },

            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: '[name].[hash:8].[ext]',
                  outputPath: '../dist/assets/fonts/',
                }
              },

            }
          }
        ]
      },
      {
        test: /\.vue$/,
        use: ["vue-loader"]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.join(__dirname, "../src"),
        // use: ["thread-loader", "cache-loader", "babel-loader"], // 这种需要安装 cache-loader
        use: [
          "thread-loader",
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }]
      },
      { test: /\.ts$/, loader: "ts-loader" },
    ]
  },
  resolve: {
    alias: {
      "@": path.join(__dirname, "../src")
    },
    extensions: [".vue", ".js", ".ts",]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../public/index.html')
    }),
    new VueLoaderPlugin(),
    // 为模块提供中间缓存，不能和 SpeedMeasurePlugin 插件同时使用
    new HardSourceWebpackPlugin(),
    // 排除缓存 MiniCssExtractPlugin 插件 ，不然会报错
    new HardSourceWebpackPlugin.ExcludeModulePlugin([
      {
        test: /mini-css-extract-plugin[\\/]dist[\\/]loader/,
      },
    ]),
  ]
};

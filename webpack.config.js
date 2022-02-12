const path = require('path');
const webpack = require('webpack')
const HtmlwebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode: "development",
  entry: "/src/main.js", //入口
  output: {
    path: path.join(__dirname, "./dist"), //打包输出路径，必须是绝对路径
    filename: "bundle.js" //打包之后的 JS 名称
  },
  devServer: {
    contentBase: path.join(__dirname, "./dist"), //打包之后的目录
    // open: true, //打包完成自动打开浏览器预览
    quiet: true, //隐藏在 terminal中显示打包信息
    progress: true, //显示打包进度 
    port: 3000,  //不指定端口会自动分配
    hot: true, //开启热更新
    clientLogLevel: 'none',  //关闭浏览器控制台输出的热更新信息
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: "vue-loader"
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      // 处理 css 
      {
        test: /\.(css)$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader" //关键代码
        ]
      },
      // 处理 less 
      {
        test: /\.(less)$/,
        use: [
          "style-loader",
          "css-loader",
          "less-loader",
          "postcss-loader" //关键代码
        ]
      },
      // 处理 less 和 css ，不推荐使用，文件为CSS 时，虽然也可以处理，但是速度会比较慢（css文件大的时候特别明显）。因为需要先经过 less-loader 的处理，多了个步骤
      // {
      // 	test: /\.(less|css)$/,
      // 	use: [
      // 		"style-loader",
      // 		"css-loader",
      // 		"less-loader"
      // 	]
      // },
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
                  outputPath: 'assets/images/', //打包之后文件存放的路径, dist/images
                  // publicPath: 'assets/' // 拼接在url的目录，不设置默认使用 outputPath 的路径
                }
                // 路径也可以直接写在 name 上，和上面效果一致
                //  options: {
                // 	 name: 'images/[name].[hash:8].[ext]',
                //  }
              },

            }
          }
        ]
      },
      // 媒体文件
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
                  outputPath: 'media/',
                }
              },

            }
          }
        ]
      },
      //字体文件
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
                  outputPath: 'fonts/',
                }
              },

            }
          }
        ]
      },
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlwebpackPlugin({
      //配置 html 生成模版
      template: path.join(__dirname, './public/index.html')
    })
  ]
};

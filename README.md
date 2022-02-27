webpack4 + vue2 脚手架

支持vue-router vuex
支持typescript、less

优化部分

thread-loader 开启多线程
cache-loader 开启缓存，为下次编译提速
babel-loader 也自带loader

压缩js
```optimization {
    minimizer: {
        // 压缩 JS
      new TerserPlugin({
        parallel: true, //开启多线程
        // include: path.join(__dirname, "../src"),
        sourceMap: true, // 如果使用了 SourceMapDevToolPlugin ，需要设置为 true
        extractComments: false, // 默认打包会生成 LICENSE.txt  文件，这里设置禁止生成
        terserOptions: {
          output: {
            comments: false, //删除注释
          },
          compress: {
            drop_console: true //删除 console
            // drop_debugger: false //默认为 true, 会删除 debugger
          },
        },

      }),
    }
}
```
css提取，并压缩
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// 配置cdn 存在的包，避免再次打包
externals: {
    "vue": "Vue",
    "vue-router": "VueRouter"
  },

tree-shaking
package.json sideEffects 配置允许副作用代码
"sideEffects": [
    "*.css",
    "*.vue",
    "*.less"
  ],

自定义plugin的简易尝试

忽略commit 检测 
git commit -m '验证忽略检查' --no-verify



webpack4在生产环境下默认使用tree shaking，且优先级最高
亲测 只有 mode为 ‘development’ 时，才能打包没有引用过的代码


webpack5 和 webpack4 的区别

1、webpack5的 mode=“production” 自动开启 tree-shaking。（实测，webpack4.46.0 也开启）
2、webpack5生产环境自动压缩js代码
webpack5开发环境配置
```// webpack.config.js中
  module.exports = {
     optimization: {
       usedExports: true, //只导出被使用的模块
       minimize : true // 启动压缩
     }
  }
```
webpack4 需要配置
```const TerserPlugin = require('terser-webpack-plugin')

module.exports = { 
// ...other config
optimization: {
  minimize: !isDev,
  minimizer: [
    new TerserPlugin({
      extractComments: false, 
      terserOptions: { 
        compress: { 
          pure_funcs: ['console.log'] 
        }
      }
    }) ]
 }
 ```
 
 3、webpack5 自动压缩js失效，原因在optimization => minimizer配置了css压缩导致（optimize-css-assets-webpack-plugin）
 解决方案 
 1、像webpage4 一样配置压缩js
 2、配置css压缩 到plugins 中

 4、webpack5打算废弃 optimize-css-assets-webpack-plugin ，使用css-assets-webpack-plugin代替

 5、webpack5 缓存 cache 配置选项
 // 使用持久化缓存
  ```cache: {
    type: 'filesystem'，
    cacheDirectory: path.join(__dirname, 'node_modules/.cac/webpack')
  }
  ```
 webpack4 用 hard-source-webpack-plugin

 6、对loader的优化
 webpack 4 加载资源需要用不同的 loader
 raw-loader 将文件导入为字符串
url-loader 将文件作为 data url 内联到 bundle文件中
file-loader 将文件发送到输出目录中

webpack5 的资源模块类型替换 loader

asset/resource 替换 file-loader(发送单独文件)
asset/inline 替换 url-loader （导出 url）
asset/source 替换 raw-loader（导出源代码）
asset

7、启动服务的差别
1.webpack4 启动服务
通过 webpack-dev-server 启动服务

2.webpack5 启动服务
内置使用 webpack serve 启动，但是他的日志不是很好，所以一般都加都喜欢用 webpack-dev-server 优化。

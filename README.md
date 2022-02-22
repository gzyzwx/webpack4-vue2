webpack4 + vue2 脚手架

支持vue-router vuex
支持typescript、less

优化部分

thread-loader 开启多线程
cache-loader 开启缓存，为下次编译提速
babel-loader 也自带loader

压缩js
optimization {
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

css提取，并压缩
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// 配置cdn 存在的包，避免再次打包
externals: {
    "vue": "Vue",
    "vue-router": "VueRouter"
  },

自定义plugin的简易尝试

忽略commit 检测 
git commit -m '验证忽略检查' --no-verify
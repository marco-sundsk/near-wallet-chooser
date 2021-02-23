/*
 * @Author: your name
 * @Date: 2021-01-05 16:46:17
 * @LastEditTime: 2021-02-22 21:13:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /near-coin/vue.config.js
 */
const path = require('path')// 引入path模块
const publicPath = './'
function resolve (dir) {
  return path.join(__dirname, dir)// path.join(__dirname)设置绝对路径
}
// 引入等比适配插件
const px2rem = require('postcss-px2rem')

// 配置基本大小
const postcss = px2rem({
  // 基准大小 baseSize，需要和rem.js中相同
  remUnit: 16
})
module.exports = {
  publicPath,
  devServer: {
    publicPath,
    open: true,
    port: 8000
  },
  lintOnSave: true,
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          postcss
        ]
      }
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('./src'))
      .set('components', resolve('./src/components'))
      .set('pages', resolve('./src/pages'))
      .set('assets', resolve('./src/assets'))
      .set('styles', resolve('./src/styles'))
      // set第一个参数：设置的别名，第二个参数：设置的路径
  }
}

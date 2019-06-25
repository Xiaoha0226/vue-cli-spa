const path = require('path');
const fs = require('fs');

const HtmlWebpackPlugin = require('html-webpack-plugin');
//引入vconsole插件
var vConsolePlugin = require('vconsole-webpack-plugin');
var argv = require('yargs').argv;

module.exports = {
  publicPath:
    process.env.NODE_ENV === 'production' // 部署应用包时的基本 URL
      ? 'https://www.xxx.com'
      : '/',
  outputDir: 'release', // 生成的生产环境构建文件的目录
  assetsDir: 'static', // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  indexPath:
    process.env.NODE_ENV === 'production'
      ? path.resolve(__dirname, './release/page/index.html')
      : 'index.html', // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
  filenameHashing: true, // 生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存
  lintOnSave: true, // eslint-loader 是否在保存的时候检查
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本。
  transpileDependencies: [], // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
  productionSourceMap: false, // 不需要生产环境的 source map
  devServer: {
    disableHostCheck: true, // 不加这个会报这个错误 -> Invalid Host header
    before: app => {
      app.post('/api/*', (req, res) => {
        let reqPath = req.path;
        console.log(reqPath);
        fs.readFile(path.resolve(__dirname, `./mockdata/${reqPath}.json`), (err, data) => {
          if (err) {
            console.log(err);
          } else {
            res.json(JSON.parse(data));
          }
        });
      });
      app.get('/api/*', (req, res) => {
        let reqPath = req.path;
        console.log(reqPath);
        fs.readFile(path.resolve(__dirname, `./mockdata/${reqPath}.json`), (err, data) => {
          if (err) {
            console.log(err);
          } else {
            res.json(JSON.parse(data));
          }
        });
      });
    },
  },
  configureWebpack: {
    entry: {
      common: ['./src/assets/css/common.scss', './src/assets/js/common.js'],
      app: './src/main.js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        baseUrl: process.env.NODE_ENV === 'production' ? 'https://www.xxx.com' : '/',
        template: path.resolve(__dirname, './index.html'),
        chunksSortMode: function(chunk1, chunk2) {
          var order = ['chunk-vendors', 'chunk-common', 'common', 'app'];
          var order1 = order.indexOf(chunk1.names[0]);
          var order2 = order.indexOf(chunk2.names[0]);
          return order1 - order2;
        },
      }),
      new vConsolePlugin({ enable: !!argv.debug }),
    ],
  }
};

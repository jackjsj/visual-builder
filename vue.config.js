const CompressionWebpackPlugin = require('compression-webpack-plugin'); // gzip 静态压缩插件
const { ContextReplacementPlugin } = require('webpack');
const path = require('path');

module.exports = {
  outputDir: 'dist',
  publicPath: '/',
  assetsDir: '',
  lintOnSave: true,
  configureWebpack: config => {
    const plugins = [
      // new ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/), // 优化：moment 只留下简体中文语言
    ];
    if (process.env.NODE_ENV === 'production') {
      plugins.push(
        // gzip压缩插件，生成gz文件
        new CompressionWebpackPlugin({
          test: /\.(js|css|html)$/,
          filename: '[path].gz[query]',
          threshold: 10240, // 超过10k才压缩
        }),
      );
    }
    return {
      plugins,
      resolve: {
        alias: {
          // 优化：使用ant-design-vue中的moment，这样可避免重复打包
          // moment: 'ant-design-vue/node_modules/moment',
          entities: path.resolve(__dirname, './src/assets/js/entities'),
        },
      },
      // 优化：使用cdn引入
      externals: {
        echarts: 'echarts',
        moment: 'moment',
      },
    };
  },
};

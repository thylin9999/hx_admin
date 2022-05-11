const path = require('path')

// 导入terser-webpack-plugin-->减少js体积(其中删除js的console.log和注释)
const TerserWebpackPlugin = require('terser-webpack-plugin')
// 实例化TerserWebpackPlugin对象
const terserPlugin = new TerserWebpackPlugin({  //生产环境注释console
    parallel: 4,
    extractComments: true,
    // terserOptions: {
    //     compress: {
    //         warnings: false,
    //         // drop_console: true,
    //         // drop_debugger: true,
    //         // pure_funcs: ['console.log'] //移除console
    //     }
    // }
});


module.exports = {
    // 基本路径
    publicPath: "",
    // publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
    // 输出文件目录
    // outputDir: process.env.NODE_ENV === 'production' ? 'dist' : 'devdist',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: false,
    chainWebpack: (config) => {
        // 修复HMR
        config.resolve.symlinks(true)
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
        types.forEach(type => addStyleResource(config.module.rule('stylus').oneOf(type)))
        // if (process.env.NODE_ENV === "production") { //查看打包状态进行优化
        //     if (process.env.npm_config_report) {
        //         config
        //             .plugin("webpack-bundle-analyzer")
        //             .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin)
        //             .end();
        //     }
        // }
    },
    configureWebpack: (config) => {
        config.resolve = { // 配置解析别名
            extensions: ['.js', '.json', '.vue'],
            alias: {
                '@': path.resolve(__dirname, './src'),
                '@components': path.resolve(__dirname, './src/components'),
                '@router': path.resolve(__dirname, './src/router'),
                '@views': path.resolve(__dirname, './src/views'),
                '@public': path.resolve(__dirname, 'public'),
                // '@static': path.resolve(__dirname, './static'),
                '@assets': path.resolve(__dirname, './src/assets'),
            }
        }
        config.optimization = {//生产环境注释console
            minimizer: [
                // 只有打包环境为production时才能生效
                terserPlugin
            ],
        }
        //警告 webpack 的性能提示
        config.performance = {
            hints: 'warning',
            //入口起点的最大体积
            maxEntrypointSize: 50000000,
            //生成文件的最大体积
            maxAssetSize: 30000000,
            //只给出 js 文件的性能提示
            assetFilter: function (assetFilename) {
                return assetFilename.endsWith('.js');
            }
        }
    },
    // 生产环境是否生成sourceMap文件  作用主要用来处理chunk文件映射 程序到生产环境运行时报错还能找到源码对应的位置
    productionSourceMap: false,
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        // extract: true,
        // 开启 CSS source maps?
        sourceMap: true,
        // css预设器配置项    移动放开注释
        // loaderOptions: {
        //     postcss: {
        //         plugins: [
        //             require('postcss-px2rem')({remUnit: 37.5}),
        //         ]
        //     }
        // },
        // 启用 CSS modules for all css / pre-processor files.
        requireModuleExtension: true
    },
    // use thread-loader for babel & TS in production build
    // enabled by default if the machine has more than 1 cores
    parallel: require('os').cpus().length > 1,
    /**
     *  PWA 插件相关配置,see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
     */
    pwa: {},

    // webpack-dev-server 相关配置
    devServer: {
        open: true, // 编译完成是否打开网页
        host: '0.0.0.0', // 指定使用地址，默认localhost,0.0.0.0代表可以被外界访问
        port: 8081, // 访问端口
        https: false, // 编译失败时刷新页面
        hot: false, // 开启热加载
        hotOnly: false,
        overlay: { // 全屏模式下是否显示脚本错误
            warnings: true,
            errors: true
        },
        // proxy: {// 设置代理
        //     '/': {
        //         ws: false,
        //         target: 'http://user.zb123.tech',
        //         changeOrigin: true,
        //         pathRewrite: {
        //             '^/': ''
        //         }
        //     },
        //     '/gift': {
        //         ws: false,
        //         target: 'http://img.zb123.tech',
        //         changeOrigin: true,
        //     },
        // }
    },
    pluginOptions: {},

}

// 全局导入样式
function addStyleResource (rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: []
        })
}

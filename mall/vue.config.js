module.exports = {
    devServer: {
        host: 'localhost',
        port: 8080,
        proxy: {
            '/api': {
                target: 'http://mi.futurefe.com',
                changeOrigin: true,
                pathRewrite: {
                    '/api': '/api'
                }
            }
        }
    },
    outputDir: 'ODST', // 打包输出文件夹名称
    publicPath: '/app', // 配置二级目录，域名下的下一个目录
    indexPath: 'index2.html', // 入口文件路径/名称
    lintOnSave: false, // 开启eslint否
    productionSourceMap: false // 开启map文件与否
}
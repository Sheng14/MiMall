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
    }
}
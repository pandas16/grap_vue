const BASE_URL = process.env.NODE_ENV === 'production' ? '/grap_vue/': '/';
// process.env.BASE_URL = BASE_URL;

module.exports = {
    publicPath: BASE_URL,
    //assetsDir: "grap_vue",
    outputDir: "dist/grap_vue",
    devServer: {
        proxy : {
            "/" : {
                //target : 'http://localhost:9000', 
                target : 'https://service-6pfw5qgc-1307230249.gz.apigw.tencentcs.com/release/', 
                changeOrigin: true,
                ws : true,
                // pathRewrite: {
                //     '^/grap_vue': ''
                // }
            },
            "/grap_vue" : {
                //target : 'http://localhost:9000', 
                target : 'https://service-6pfw5qgc-1307230249.gz.apigw.tencentcs.com/release/', 
                changeOrigin: true,
                ws : true,
                // pathRewrite: {
                //     '^/grap_vue': ''
                // },
            },
        }
    },
};
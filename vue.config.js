module.exports = {
    devServer: {
        proxy : {
            "/" : {
                target : 'http://localhost:9000', 
                //target : 'https://service-6pfw5qgc-1307230249.gz.apigw.tencentcs.com/release', 
                changeOrigin: true,
                ws : true
            },
        }
    }
};